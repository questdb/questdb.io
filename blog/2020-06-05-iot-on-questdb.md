---
title: IoT on QuestDB
author: David G Simmons
author_title: QuestDB Team
author_url: https://github.com/davidgs
author_image_url: https://avatars.githubusercontent.com/davidgs
description:
  Demonstration of an IoT application with QuestDB. This is based on an Arduino
  device.
keywords:
  - iot
  - databases
  - questdb
  - timeseries
  - sensor
  - arduino
tags: [iot]
---

As you can well imagine, I've been super busy in my hew job at QuestDB so this
has taken me longer than I would have liked, but here we are. If you know me at
all, you know that one of the first things I always do with new things is, well,
connect things to them! So I immediately went to connect an IoT device to
QuestDB to see how it went. Unsurprisingly, it went quite well. So here's how it
went, from start to finish.

<!--truncate-->

## The Database Part

The first thing I had to do was a to get QuestDB up and running. Luckily, this
is very straightforward. I guess I could have gone the Docker route, but as
you're probably aware, I'm not a huge fan of Docker (in no small part due to the
fact that it will literally suck the life out of a macOS laptop). There's also
(for you macOS users) `brew install questdb` but since I work here, and I wanted
to test out the latest and greatest Web Console, I decided to build from source:

![Terminal showing QuestDB being build from its source code](/img/blog/2020-06-05/build.gif)

It builds really quickly due to the lack of external dependencies, so that is
great! Then all I have to do is start it:

![Terminal showing how to start QuestDB](/img/blog/2020-06-05/start.gif)

That is literally all there is to getting QuestDB built and running. But that's
just the first part. Now it's time to do something mildly useful with it. First,
I'll need to create a table in QuestDB to store my IoT Data (A bit more on this
later, so store a pointer to this).

![Screenshot of a SQL query in the Web Console to create a table](/img/blog/2020-06-05/console.png)

Remember, we're doing SQL here, so it there's no new language or syntax to
learn. This is a really simple table that I'm building because I'm going to be
using an ESP8266 with a (really awful) DHT11 temperature and humidity sensor on
it.

## The Sensor Part

For this I'm going to use an ESP8266-based WEMOS D1 Mini only because I happen
to have a giant pile of them lying around. I buy them in bulk because they are a
dollar or 2 each, easy to use, and largely disposable if I blow one up (which I
do with alarming regularity.). The circuit is extremely simple to do:

![Electrical schema showing how the sensor is wired](/img/blog/2020-06-05/sensor.png)

I used an actual WEMOS Shield with the DHT11 on it, so I didn't have to
breadboard it, but this schematic gives you an idea of how simple the wiring is.
It's literally 3 wires.

## The Code Part

Here is where the magic happens. How I actually send the sensor data to the
database. There is a simple example program included with the Adafruit DHT
Unified Sensor Library that I recommend starting with in order to make this a
bit easier. It already has all the parts to read from the sensor so you don't
have to write those from scratch. Remember: Good developers copy, but great
developers paste!

Since I'm using the 8266, and I'll need internet connectivity, I'll need all the
WiFi bits:

```java
#include <WiFiServerSecure.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiUdp.h>
#include <ESP8266WiFiType.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFiAP.h>
#include <WiFiClient.h>
#include <BearSSLHelpers.h>
#include <WiFiServer.h>
#include <ESP8266WiFiScan.h>
#include <WiFiServerSecureBearSSL.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiSTA.h>
#include <WiFiClientSecureAxTLS.h>
#include <WiFiServerSecureAxTLS.h>
```

Really all you have to do is go to the 'Sketch' Menu, Choose 'Include Library'
and select the 'ESP8266WiFi' library and you get all this stuff imported for
you.

Here's some boiler-plate code you can always use to get your ESP8266 on your
WiFi:

```java
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#define DHTPIN D4

// Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11
#define QUEST_SERVER "10.10.10.10" // use your server's IP address!
#define QUEST_PORT 9009
#define SENSOR_ID 4343 // I made this up
#define SENSOR_NAME "DHT11-WEMOS"

const char* ssid = "your-ssid";
const char* password = "your-password";
DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;
WiFiUDP Udp;

void setup(){
  Serial.begin(115200);
  delay(10);
  // We start by connecting to a WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  dht.begin();
  Udp.begin(QUEST_PORT);
  Serial.println(F("DHTxx Unified Sensor Example"));
  // Print temperature sensor details.
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor"));
  Serial.print (F("Sensor Type: "));
  Serial.println(sensor.name);
  Serial.print (F("Driver Ver: "));
  Serial.println(sensor.version);
  Serial.print (F("Unique ID: "));
  Serial.println(sensor.sensor_id);
  Serial.print (F("Max Value: "));
  Serial.print(sensor.max_value);
  Serial.println(F("°C"));
  Serial.print (F("Min Value: "));
  Serial.print(sensor.min_value);
  Serial.println(F("°C"));
  Serial.print (F("Resolution: "));
}
```

That gets the basics set up. Running that should get you a WiFi connection and a
fully configured DHT11 sensor. We're almost ready to start sending data to the
database

If you were paying attention, and read the code, you'll have noticed the UDP
stuff I snuck in there. That's because we're going to make this super easy and
use UDP to send our data. And there's a <strong>really</strong> good reason for
that: InfluxDB line protocol. You see, QuestDB has a built-in InfluxDB line
Protocol listener, but (for now) it's only listening on a UDP port. So we're
going to use that.

Now, to send some data:

```java
void loop() {
  // Delay between measurements.
  delay(delayMS);
  char *buffer;
  buffer = (char *)malloc(256);
  // Get temperature event and print its value.
  double temp = -212;
  double hum = -1;
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  } else {
    Serial.print(F("Temperature: "));
    Serial.print(event.temperature);
    temp = event.temperature;
    Serial.println(F("°C"));
  }
  // Get humidity event and print its value.
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  } else {
    Serial.print(F("Humidity: "));
    Serial.print(event.relative_humidity);
    hum = event.relative_humidity;
    Serial.println(F("%"));
  }
  if(temp != -212 && hum != -1){
    char tTemp[10];
    char hTemp[10];
    dtostrf(temp, 4, 2, tTemp);
    dtostrf(hum, 4, 2, hTemp);
    sprintf(buffer, "iot,dev_id=%d,dev_name=%s temp_c=%s,humidity=%s", SENSOR_ID, SENSOR_NAME, tTemp, hTemp);
    Serial.println(buffer);
    Udp.beginPacket(QUEST_SERVER, QUEST_PORT);
    Udp.write(buffer);
    Udp.endPacket();
  }
  free(buffer);
}
```

Yeah, there's a lot going on in there. So let's break it down. First, I'm
creating a buffer to hold the data I'm going to send, and then I'll do a read of
the sensor. I set the `temp` and `hum` variables to values that I know the
sensor will never return so that I can check that I got valid readings later, to
avoid sending gibberish to the database.

I have to do some shenanigans with the temperature and humidity values in there
because one of the shortcomings of Arduinos is that they don't have `sprintf`
support for doubles. I know. So I simply turn them into strings and move on.
Once they arrive at the database, they are interpreted as doubles and life is
good. Not worth fighting about. I can then construct a buffer with straight line
protocol and ship it off to QuestDB over UDP.

Don't forget to free the memory!

## That Pointer

Remember I told you to set a pointer earlier about creating the database? Well,
here's where I come back to that. You don't <em>actually</em> have to create the
database ahead of time <em>unless</em> you want to do things like set indexes,
etc. If all you want to do is have straight values in there, then guess what?
Schema-on-write is a thing here. You can just start writing data to the
database, and it will happily store them for you. Pretty cool stuff.

## Querying the Data

Using the QuestDB Console, you can then query the data to make sure you're
getting what you expect:

![Running a SELECT query on the Web Console. The result is in both a table and a chart](/img/blog/2020-06-05/queries.gif)

That's exactly what I expected!

## What's Next

Now it's time to start building some dashboards, etc. on top of this. I'm
currently working on connecting this all up with Node Red, so that may be my
next post. We're also working on support for Grafana, which will be huge, so
stay tuned for that. If you like what you see here, pleases go give us a star on
[GitHub]({@githubUrl@}), and follow the project if you'd like to get updates!
