---
title: Google Cloud Platform
description:
  This document describes how to deploy QuestDB on Google Cloud platform using a
  Compute Engine VM with additional details on configuring networking rules
---

This guide describes how to run QuestDB on a Compute Engine instance on Google
Cloud platform with details on how to enable networking on various interfaces by
means of firewall rules.

This guide uses the official QuestDB Docker image during VM instance creation to
simplify setup steps for a quick, robust deployment. The networking rules below
show how to make ports for PostgreSQL wire protocol and REST API publicly
accessible or by whitelisted IP.

## Prerequisites

- A [Google Cloud Platform](https://console.cloud.google.com/getting-started)
  (GCP) account and a GCP Project
- The
  [Compute Engine API](https://console.cloud.google.com/apis/api/compute.googleapis.com)
  must be enabled for the corresponding Google Cloud Platform project

## Create a Compute Engine VM

1. In the Google Cloud Console, navigate to
   [Compute Engine](https://console.cloud.google.com/compute/instances) and
   click **Create Instance**

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="The Create Instance wizard on Google Cloud platform"
  height={598}
  src="/img/guides/google-cloud-platform/create-instance.png"
  width={650}
/>

2. Give the instance a name, this example uses `questdb-europe-west3`
3. Choose a **Region** and **Zone**, this example uses
   `europe-west3 (Frankfurt)` and the default zone
4. Choose a machine configuration, a general-purpose instance is `e2-medium`
   with 4GB memory
5. Enable the checkbox under **Container** and provide the latest QuestDB Docker
   image:

   ```text
   questdb/questdb:latest
   ```

Given the steps so far, the VM Instance configuration page should look like the
following:

<Screenshot
  alt="Deploying a QuestDB instance via Docker on Google Cloud Platform Compute Engine"
  height={695}
  src="/img/guides/google-cloud-platform/create-vm.png"
  width={650}
/>

Before creating the instance, assign a **Network tag** so that a firewall rule
for networking can be easily applied to instances of the same type.

1. Expand the menu item **Management, security, disks, networking, sole
   tenancy** towards the bottom of the page
2. In the **Networking** panel add a **Network tag** to identify the instance,
   this example uses `questdb`
3. Launch the instance by clicking **Create**

<Screenshot
  alt="Applying a Network tag to a Compute Engine VM Instance on Google Cloud Platform"
  height={610}
  src="/img/guides/google-cloud-platform/add-network-tag.png"
  width={650}
/>

## Create a firewall rule

1. Navigate to the
   [Firewalls configuration](https://console.cloud.google.com/networking/firewalls)
   page under **VPC network** -> **Firewalls**
2. Add the target tag `questdb`
3. Choose an IP range that this rule applies to, this example uses `0.0.0.0/0`
   (i.e. any IP)
4. In the **Protocols and ports** section, enable `8812` and `9000` for TCP.
5. Click **create**

<Screenshot
  alt="Creating a firewall rule in for VPC networking on Google Cloud Platform"
  height={654}
  src="/img/guides/google-cloud-platform/firewall-rules.png"
  width={650}
/>

All VM instances on Compute Engine within this account which have the **Network
tag** `questdb` will have this firewall rule applied.

:::info

The configuration above allows networking from any IP address for the selected
ports. A more secure approach would be to only allow incoming connections from
whitelisted IPs.

The ports we have opened are

- `9000` for the REST API and Web Console
- `8812` for PostgreSQL wire protocol

:::

## Verify the deployment

To verify the instance state, navigate to **Compute Engine** ->
[VM Instances](https://console.cloud.google.com/compute/instances). A status
indicator should show the instance as **running**:

<Screenshot
  alt="A QuestDB instance running on Google Cloud Platform showing a success status indicator"
  height={186}
  src="/img/guides/google-cloud-platform/instance-available.png"
  width={650}
/>

To verify that the QuestDB deployment is operating as expected:

1. Copy the **External IP** of the instance
2. Navigate to `<external_ip>:9000` in a browser

The Web Console should be visible:

<Screenshot
  alt="The QuestDB Web Console running on a VM instance on Google Cloud Platform"
  height={405}
  src="/img/guides/google-cloud-platform/gcp-portal.png"
  width={650}
/>

Alternatively, a request may be sent against the REST API exposed on port 9000:

```bash
curl -G \
  --data-urlencode "query=select * from telemetry_config" \
  <external_ip>:9000/exec
```
