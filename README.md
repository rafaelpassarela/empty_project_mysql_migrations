# Empty Project for MySQL and Migrations

> This project was generated in [Visual Studio 2017](https://visualstudio.microsoft.com/pt-br/downloads/). 

This project was designed to allow the rapid creation of an API in [Microsoft ASP.Net](https://www.asp.net/), using [Entity Framework](https://docs.microsoft.com/pt-br/dotnet/framework/data/adonet/ef/overview) and [Migrations](https://msdn.microsoft.com/pt-br/library/jj591330.aspx?f=255&MSPPError=-2147217396) with [MySQL](https://www.mysql.com/) database.

To the point:<br>
[Warming up the System](#warming-up-the-system) <br>
[Cloning This Repository](#cloning-this-repository) <br>
[Loading the Project](#loading-the-project) <br>
[Configuring the Database](#configuring-the-database)<br>

## Warming up the System
To work, besides having VS installed, you will need a MySQL ADO connector, which can be downloaded from this [link](https://dev.mysql.com/downloads/connector/net/) and a MySQL server running on your system, for test purposes, you can use the incredible [USBWebServer](http://www.usbwebserver.net/webserver/), it is a combination of popular webserver software: Apache, MySQL, PHP and phpMyAdmin. With USBWebserver it is possible to develop and show your PHP websites everywhere and anytime. The main advantage of USBWebserver is that you can use it from USB.

## Cloning This Repository
The easiest way is to create a local folder and clone this repo, type the follow command in the windows prompt (CMD):  
 `git clone https://github.com/rafaelpassarela/empty_project_mysql_migrations.git`
![git clone cmd](https://user-images.githubusercontent.com/13123625/42899528-bf03397a-8a9c-11e8-85d7-99b43c36717b.png)
This will generate a new local copy, but you **can't commit there**.
If you want to control your own repo, create one on [GitHub](https://github.com) or another version control and clone it to a new folder. Go to the folder where you made the clone of *empty_project_mysql_migrations* and copy/cut all files and folders, with the exception of the ".git" folder.
Paste these files and folders into your new folder and you're done. Have fun!

## Loading the Project
When you load the Solution into VS, some Nuget packages will be downloaded, with additional attention to these ones:
 - MySql.Data (v6.10.7.0): Beware, there are some [reports](https://stackoverflow.com/questions/48353585/the-provider-did-not-return-a-providermanifesttoken-string-mysql-with-entity-f) that with versions higher than 8.0 the migration does not work, so I used this one.
 - MySql.Data.Entity (v6.10.7.0)
 - MySql.Data.Entities (v6.8.3.0)

![Nuget Packages](https://user-images.githubusercontent.com/13123625/42899242-d32a3be8-8a9b-11e8-8ceb-fec50f1e2f16.png)
## Configuring the Database
Before starting to load and write data to the database, some things need to be adjusted. We need to configure the server path, database name, user and password. This information is configured in the **Web.config** file. There is the possibility of setting up a database for Debug and another for Release. <br>
![Solution Configuration](https://user-images.githubusercontent.com/13123625/42908261-d50b344c-8ab6-11e8-80cf-1f54b210c8d0.png)
Basically we need to provide only a valid connection string, you can consult various types at [connectionstrings.com](https://www.connectionstrings.com/). In our case, we will provide a default MySQL connection string and define the provider name for this connection. <br>
```xml
<connectionStrings>
	<add name="MyConnectionName" 
	     providerName="MySql.Data.MySqlClient" 
	     connectionString="Server=127.0.0.1;Port=3307;Database=sampleApi;Uid=root;Pwd=usbw;SslMode=none;"/>
</connectionStrings>
```
In the code above, we added a new connection string, the main attributes are: <br>
- `name` = Define the name for our connection, we will reference it in the migration configuration<br>
- `providerName` = Informs which class will be responsible for managing the connection<br>
- `connectionString` = the connection string itself, this is the ** single ** that must be changed, according to its parameters.<br>

Now imagine having to change the `Web.config` at all times, one hour pointing to the test db and another time pointing to the real db. To solve this, we have two extra configuration files: `Web.Debug.config` and `Web.Release.config`. They are pretty much the same `web.config` file, but only with the specific changes for each mode, the only detail is the use of the transform attribute `xdt:Transform="SetAttributes" xdt:Locator="Match(name)"`, which indicates what and when to change.
This is my *Release* config:
```xml
<connectionStrings>
	<add name="MyConnectionName"
		 providerName="MySql.Data.MySqlClient"
		 connectionString="Server=MySQLServer;Database=sampleApi;Uid=MySQLUser;Pwd=MySQLPwd;"
		 xdt:Transform="SetAttributes" xdt:Locator="Match(name)"/>
</connectionStrings>
```
And this is my *Debug* config:
```xml
<connectionStrings>
	<add name="MyConnectionName"
		 providerName="MySql.Data.MySqlClient"
		 connectionString="Server=127.0.0.1;Port=3307;Database=sampleApi;Uid=root;Pwd=usbw;SslMode=none;"
		 xdt:Transform="SetAttributes" xdt:Locator="Match(name)"/>
</connectionStrings>
```
Did you notice the subtle difference? Only the `connectionString` attribute has changed. The `name` and `providerName` attributes must be the same.
One last detail should be changed before actually starting to get your hands dirty. In the class responsible for the database context, we have to enter the same name assigned in the connection, inside the `Web.config` file. Locate the `Core\MySQLDbContext.cs` file and change the `base` name parameter, like the image below.<br>
![DbContext](https://user-images.githubusercontent.com/13123625/42949911-46c0ab70-8b49-11e8-8b86-11a5fb7d5c72.png) <br>

