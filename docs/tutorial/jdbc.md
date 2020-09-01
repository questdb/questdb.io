---
title: JDBC tutorial
sidebar_label: JDBC
description: Tutorial showing how build a Java application with QuestDB
---

This tutorial uses the official
[Postgres JDBC driver](https://jdbc.postgresql.org/) to connect to QuestDB.

## Dependency

### Maven

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.12</version>
</dependency>
```

### Gradle

```
compile group: 'org.postgresql', name: 'postgresql', version: '42.2.12'
```

## Code snippet

```java
 import java.sql.Connection;
 import java.sql.DriverManager;
 import java.sql.PreparedStatement;
 import java.sql.ResultSet;
 import java.util.Properties;
 import java.util.TimeZone;

 public class JdbcExmple {

     public static void main(String[] args) throws Exception {
         Class.forName("org.postgresql.Driver");
         Properties properties = new Properties();
         properties.setProperty("user", "admin");
         properties.setProperty("password", "quest");
         properties.setProperty("sslmode", "disable");
         properties.setProperty("binaryTransfer", "true");
         TimeZone.setDefault(TimeZone.getTimeZone("EDT"));
         final Connection connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:8812/qdb", properties);

         PreparedStatement statement = connection.prepareStatement("select x,? from long_sequence(5)");
         statement.setInt(1, 4);

         ResultSet rs = statement.executeQuery();
         rs.close();
         connection.close();
     }
 }

```
