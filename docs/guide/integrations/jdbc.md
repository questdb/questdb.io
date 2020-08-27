---
title: PG wire client in JDBC
sidebar_label: JDBC
---


Maven dependency:
```
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.12</version>
</dependency>
```


```
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
```