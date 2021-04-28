---
title: Deploy a QuestDB AMI to AWS using Packer
sidebar_label: AWS AMI using Packer
description:
  This document describes how to build an AMI with QuestDB installed using
  Packer and how to run this AMI on Amazon Web Services
---

This guide describes how to create an AWS Amazon Machine Image (AMI) based on
Amazon Linux with QuestDB installed and uses the official QuestDB
[packer AMI]({@githubOrgUrl@}/questdb-packer-ami) with a template that can be
used as a point of reference to create your own AMIs.

This document also covers details on applying networking rules via security
groups to allow access to the REST API and web console publicly accessible or by
whitelisted IPs, and how to enable logging to CloudWatch via the AWS CLI.

## Prerequisites

- An [Amazon Web Services](https://console.aws.amazon.com) account
- [AWS CLI](https://aws.amazon.com/cli/) for programmatic access to AWS
  resources
- [Packer](https://www.packer.io/docs/install/index.html) for building and
  provisioning AMIs

## Verifying AWS CLI configuration

To check that the AWS CLI is configured correctly, run the following command:

```bash
aws configure list
```

The configuration should be returned showing which profile, credentials and
region is configured:

```bash
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                     demo           manual    --profile
access_key     ****************XYZ1 shared-credentials-file
secret_key     ****************XYZ2 shared-credentials-file
    region             eu-central-1      config-file    ~/.aws/config
```

If no configuration has been set up for the AWS CLI yet, run the following
command to set up the CLI:

```bash
aws configure
```

## Clone the Packer repository

To configure and build the machine image, clone the official GitHub repository
with a Packer template:

```bash
git clone https://github.com/questdb/questdb-packer-ami.git
```

A placeholder configuration file for QuestDB server settings can be found at the
following location:

```bash
./src/config/server.conf
```

The included configuration does not override any settings, therefore default
server configuration will be used in the AMI. For a comprehensive list of
properties which may be set, refer to the
[QuestDB server configuration](/docs/reference/configuration/) documentation.

## Build and provision the AMI

The `src` directory contains a `template.json` file which may be used as a
starting point for your own AMI.

```bash
cd questdb-packer-ami/src
# view template contents
cat template.json
```

The template uses Amazon Linux 2 with the `t3.micro` instance type. The default
template variables may be passed on the command line using
`-var <var_name>=<var_value>` to specify a specific region and AMI base name,
i.e.;

- `aws_region=us-east-1`
- `base_ami_name=questdb`

The following command will build the QuestDB machine image and create it in the
`eu-central-1` region with the name `<base_ami_name>-amzn2-<timestamp>`:

```bash
packer build -var 'aws_region=eu-central-1' template.json
```

Log output from Packer will show a **Packer Builder** EC2 instance creating the
image:

```log
==> ami: Prevalidating any provided VPC information
==> ami: Prevalidating AMI Name: questdb-amzn2-...
==> ami: Creating temporary keypair: packer_607...
...
==> ami: Deleting temporary keypair...
Build 'ami' finished after 5 minutes 13 seconds.
==> Builds finished. The artifacts of successful builds are:
--> ami: AMIs were created:
eu-central-1: ami-0a...
```

To view the details of the image, the following AWS CLI command will describe
AMIs created by the current AWS account:

```bash
aws ec2 describe-images --owners self
```

The QuestDB image should be listed as one of the available images. Make a note
of the `ImageId` value which will be referred to in the following section as
`<ami_id>`:

```json
{
  "Images": [
    {
      "Architecture": "x86_64",
      "CreationDate": "2021-04-19T14:24:15.000Z",
      "ImageId": "ami-0a5...",
      "ImageLocation": "123451234567/questdb-amzn2-1618842140",
      "ImageType": "machine",
      "Public": false,
      "OwnerId": "123451234567",
      "PlatformDetails": "Linux/UNIX",
      "UsageOperation": "RunInstances",
      "State": "available",
      "BlockDeviceMappings": [
        {
          "DeviceName": "/dev/xvda",
          "Ebs": {
            "DeleteOnTermination": true,
            "SnapshotId": "snap-085...",
            "VolumeSize": 8,
            "VolumeType": "gp2",
            "Encrypted": false
          }
        }
      ],
      "Description": "An Amazon Linux 2 AMI with QuestDB installed.",
      "EnaSupport": true,
      "Hypervisor": "xen",
      "Name": "questdb-amzn2-1618842140",
      "RootDeviceName": "/dev/xvda",
      "RootDeviceType": "ebs",
      "SriovNetSupport": "simple",
      "VirtualizationType": "hvm"
    }
  ]
}
```

## Enable networking and launch an instance

Instances using this AMI with QuestDB installed can be directly launched from
the CLI. For convenience, we will first allow networking on instance creation
via a security group. For this guide, we will enable port `9000` which allows
HTTP access.

```bash
aws ec2 create-security-group \
 --group-name questdb-sg \
 --description "QuestDB security group"
```

Make a note of the security group ID returned from this command and pass it as
the `<sec_group_id>` variable below to allow ingress on TCP port `9000` for IPV4
and IPV6:

```bash
aws ec2 authorize-security-group-ingress \
  --group-id <sec_group_id> \
  --ip-permissions \
  IpProtocol=tcp,FromPort=9000,ToPort=9000,IpRanges='[{CidrIp=0.0.0.0/0}]' \
  IpProtocol=tcp,FromPort=9000,ToPort=9000,Ipv6Ranges='[{CidrIpv6=::/0}]'
```

:::info

- In this example, ingress on port `9000` is open for requests originating from
  **any IP**. This is a security group configuration used for illustrative
  purposes only. When deploying QuestDB to production, only trusted or required
  public IP addresses should be allowed.

- Users may also want to enable networking for other types of traffic. QuestDB
  listens for PostgreSQL wire protocol by default on port `8812` and InfluxDB
  Line Protocol on ports `9009` for TCP and UDP.

:::

Launch the AMI with the security group attached:

```bash
aws ec2 run-instances --count 1 \
  --image-id <ami_id> \
  --security-group-ids <sec_group_id>
```

## Verifying the deployment

To find the public IP address of the QuestDB instance, run the following
command, replacing the instance ID in the `filters` parameter (`<ami_id>`):

```bash
aws ec2 describe-instances \
  --filters "Name=image-id,Values=<ami_id>" \
  --query "Reservations[].Instances[].PublicIpAddress"
```

The CLI will return the public IP of EC2 instances running the QuestDB AMI
created in the preceding section. To verify that the web console of this running
instance is active:

1. Copy the **External IP** of the instance
2. Navigate to `<external_ip>:9000` in a browser

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="The QuestDB Web Console running on EC2 on Amazon Web Services"
  height={334}
  src="/img/guides/aws-packer/console-available.png"
  width={650}
/>

Alternatively, a request may be sent against the REST API exposed on port
`9000`:

```bash
curl -G \
  --data-urlencode "query=select * from telemetry_config" \
  <external_ip>:9000/exec
```

For more information on using this functionality, see the official documentation
for using the [QuestDB REST API](/docs/reference/api/rest/).

## Logging using AWS CloudWatch

The AMI uses [Linux logrotate utility](https://linux.die.net/man/8/logrotate) to
automatically trim and archive logs generated by QuestDB. The
[AWS CloudWatch agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html)
is also pre-installed and configured to start sending log messages. To make the
logs available on your CloudWatch dashboard, an instance profile with the
`CloudWatchAgentServerPolicy`
[IAM policy](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-iam-roles-for-cloudwatch-agent.html)
must be associated with the EC2 instance running QuestDB.

The following two JSON documents may be copied directly without modifications to
assign an IAM role with the correct permissions for logging. Create a file
`trust_policy.json` file with the following contents which allows EC2 instances
to assume the role:

```json title="trust_policy.json"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Create a permission policy document `permission_policy.json` which provides
permissions to write to CloudWatch:

```json title="permission_policy.json"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:PutMetricData",
        "ec2:DescribeVolumes",
        "ec2:DescribeTags",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams",
        "logs:DescribeLogGroups",
        "logs:CreateLogStream",
        "logs:CreateLogGroup"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter"],
      "Resource": "arn:aws:ssm:*:*:parameter/AmazonCloudWatch-*"
    }
  ]
}
```

Create the IAM role using these documents:

```bash
# create a role with EC2 trust policy
aws iam create-role --role-name QuestDB-Log-Role \
  --assume-role-policy-document file://trust_policy.json
# attach permission policy to allow publishing to cloudwatch
aws iam put-role-policy --role-name QuestDB-Log-Role \
  --policy-name QuestDB-CloudWatch-Permissions-Policy \
  --policy-document file://permission_policy.json
```

Create an instance policy, attach the IAM role, and associate the IAM role with
the EC2 instance running QuestDB:

```bash
# create an instance profile
aws iam create-instance-profile --instance-profile-name QuestDB-CWLogging
# add the logging role
aws iam add-role-to-instance-profile \
  --instance-profile-name QuestDB-CWLogging \
  --role-name QuestDB-Log-Role
# associate it with the QuestDB instance
aws ec2 associate-iam-instance-profile --instance-id <instance_id> \
  --iam-instance-profile Name=QuestDB-CWLogging
```

Create a CloudWatch log group and log stream:

```bash
aws logs create-log-group  --log-group-name "/questdb-<instance_id>"
aws logs create-log-stream --log-group-name "/questdb-<instance_id>" \
  --log-stream-name "questdb-<instance_id>"
```

To read the latest log events from this stream from the CLI, use the following
command:

```bash
aws logs get-log-events --log-group-name "/questdb-<instance_id>"\
   --log-stream-name "questdb-systemd-service.log"
```

A JSON object containing the most recent events will be returned:

```json
{
    "events": [
        {
            "timestamp": 1618907396917,
            "message": "...http-server connected [ip=1.2.3.4, fd=19]",
            "ingestionTime": 1618907735820
        },
        {
            "timestamp": 1618907396917,
            "message": "...I i.q.c.h.p.StaticContentProcessor [19] incoming [url=/]",
            "ingestionTime": 1618907735820
        },
...
```
