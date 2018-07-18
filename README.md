# Empty Project for MySQL and Migrations

> This project was generated in [Visual Studio 2017](https://visualstudio.microsoft.com/pt-br/downloads/). 

This project was designed to allow the rapid creation of an API in [Microsoft ASP.Net](https://www.asp.net/), using [Entity Framework](https://docs.microsoft.com/pt-br/dotnet/framework/data/adonet/ef/overview) and [Migrations](https://msdn.microsoft.com/pt-br/library/jj591330.aspx?f=255&MSPPError=-2147217396) with [MySQL](https://www.mysql.com/) database.

To the point:
[Warming up the System](#warming-up-the-system)
[Cloning This Repository](#cloning-this-repository)
[Loading the Project](#loading-the-project)

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
