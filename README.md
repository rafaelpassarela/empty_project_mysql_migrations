# Empty Project for MySQL and Migrations

> This project was generated in [Visual Studio 2017](https://visualstudio.microsoft.com/pt-br/downloads/). 

This project was designed to allow the rapid creation of an API in [Microsoft ASP.Net](https://www.asp.net/), using [Entity Framework](https://docs.microsoft.com/pt-br/dotnet/framework/data/adonet/ef/overview) and [Migrations](https://msdn.microsoft.com/pt-br/library/jj591330.aspx?f=255&MSPPError=-2147217396) with [MySQL](https://www.mysql.com/) database. We also took advantage of [Dependency Injection](https://docs.microsoft.com/pt-br/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.1).<br/><br/>
To the point:<br/>
[Warming up the System](#warming-up-the-system) <br/>
[Cloning This Repository](#cloning-this-repository) <br/>
[Loading the Project](#loading-the-project) <br/>
[Configuring the Database](#configuring-the-database)<br/>
[Setting up The Dependency Injection](#setting-up-the-dependency-injection)<br/>
[Creating and Mapping a New Table and Class](#creating-and-mapping-a-new-table-and-class)<br/>

## Warming up the System
To work, besides having VS installed, you will need a MySQL ADO connector, which can be downloaded from this [link](https://dev.mysql.com/downloads/connector/net/) and a MySQL server running on your system, for test purposes, you can use the incredible [USBWebServer](http://www.usbwebserver.net/webserver/), it is a combination of popular webserver software: Apache, MySQL, PHP and phpMyAdmin. With USBWebserver it is possible to develop and show your PHP websites everywhere and anytime. The main advantage of USBWebserver is that you can use it from USB.

## Cloning This Repository
The easiest way is to create a local folder and clone this repo, type the follow command in the windows prompt (CMD):  
 `git clone https://github.com/rafaelpassarela/empty_project_mysql_migrations.git`
![git clone cmd](https://user-images.githubusercontent.com/13123625/42899528-bf03397a-8a9c-11e8-85d7-99b43c36717b.png)<br/>
This will generate a new local copy, but you **can't commit there**. If you want to control your own repo, create one at [GitHub](https://github.com) or another version control and clone it to a new folder. Go to the folder where you made the clone of *empty_project_mysql_migrations* and copy/cut all files and folders, with the exception of the ".git" folder.<br/>Paste these files and folders into your new folder and you're done. Have fun!

## Loading the Project
When you load the Solution into VS, some Nuget packages will be downloaded, with additional attention to these ones:<br>
 - MySql.Data (v6.10.7.0): Beware, there are some [reports](https://stackoverflow.com/questions/48353585/the-provider-did-not-return-a-providermanifesttoken-string-mysql-with-entity-f) that with versions higher than 8.0 the migration does not work, so I used this one.
 - MySql.Data.Entity (v6.10.7.0)
 - MySql.Data.Entities (v6.8.3.0)
 - Unity.WebAPI (v5.3.0.0)

![Nuget Packages](https://user-images.githubusercontent.com/13123625/42899242-d32a3be8-8a9b-11e8-8ceb-fec50f1e2f16.png)
## Configuring the Database
Before starting to load and write data to the database, some things need to be adjusted. We need to configure the server path, database name, user and password. This information is configured in the **Web.config** file. There is the possibility of setting up a database for Debug and another for Release. <br/>
![Solution Configuration](https://user-images.githubusercontent.com/13123625/42908261-d50b344c-8ab6-11e8-80cf-1f54b210c8d0.png)
Basically we need to provide only a valid connection string, you can consult various types at [connectionstrings.com](https://www.connectionstrings.com/). In our case, we will provide a default MySQL connection string and define the provider name for this connection. <br/>
```xml
<connectionStrings>
	<add name="MyConnectionName" 
		 providerName="MySql.Data.MySqlClient" 
	     connectionString="Server=127.0.0.1;Port=3307;Database=sampleApi;Uid=root;Pwd=usbw;SslMode=none;"/>
</connectionStrings>
```
In the code above, we added a new connection string, the main attributes are: <br/>
- `name` = Define the name for our connection, we will reference it in the migration configuration<br/>
- `providerName` = Informs which class will be responsible for managing the connection<br/>
- `connectionString` = the connection string itself, this is the ** single ** that must be changed, according to its parameters.<br/>

Now imagine having to change the `Web.config` at all times, one hour pointing to the test db and another time pointing to the real db. To solve this, we have two extra configuration files: `Web.Debug.config` and `Web.Release.config`. They are pretty much the same `web.config` file, but only with the specific changes for each mode, the only detail is the use of the transform attribute `xdt:Transform="SetAttributes" xdt:Locator="Match(name)"`, which indicates what and when to change.<br/>This is my *Release* config:
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
Did you notice the subtle difference? Only the `connectionString` attribute has changed. The `name` and `providerName` attributes must be the same.<br/>
One last detail should be changed before actually starting to get your hands dirty. In the class responsible for the database context, we have to enter the same name assigned in the connection, inside the `Web.config` file. Locate the `Core\MySQLDbContext.cs` file and change the `base` name parameter, like the image below.<br/>
![DbContext](https://user-images.githubusercontent.com/13123625/42949911-46c0ab70-8b49-11e8-8b86-11a5fb7d5c72.png) <br/>
## Setting up The Dependency Injection
To control Dependency Injection we will use the [Unity.WebAPI](https://github.com/devtrends/Unity.WebAPI) package. Unity.WebAPI allows the simple Integration of the Unity IoC container with ASP .NET Web API.<br/>But, What is dependency injection? Dependency injection is a technique for achieving loose coupling between objects and their dependencies or collaborators.  Rather than directly instantiating collaborators, or using static references, the objects that the class needs in order to perform its actions are provided to the class in some way. <br/> Most often, classes will declare their dependencies via their constructor, allowing them to follow the  [Explicit Dependencies Principle](http://deviq.com/explicit-dependencies-principle/).  This approach is known as "constructor injection" and it is the one we will use here.<br/>This registry is very simple, you only need a contract signature between an interface and a class. Let's assume that we have a "person" class and this class will use another class responsible for this person's "vehicles". We can not inject or refer directly to the `Vehicle` class in the `Person` class, we need to inject the signature, the interface that represents the `Vehicle` class, in this case, called `IVehicle`. 
First, we need an interface, like this one:
```d
public interface IVehicle {
	bool DoSomething();
}
```
Then we create the class that implements this interface:
```d
public class Vehicle : IVehicle {
	public bool DoSomething(){
		// it doesn't do anything, I know, this is just an example
		return true; 
	}
} 
```
Now, to make the `Person` class use the `Vehicle` class, let's inject the **interface** into the class constructor, with that nice code below:
```d
public class Person{
	private readonly IVehicle _vehicle;

	public Person(IVehicle vehicle) {
		_vehicle = vehicle;
	}

	public bool NeedSomethingFromVehicle() {
		return _vehicle.DoSomething();
	}
}
```
You may be wondering, how does the program know that when we want an interface of type `IVehicle` it should instantiate the class` Vehicle`, right? Well, we need to register this association in the `UnityConfig` class, in this case it looks like this:
```d
public static class UnityConfig{
	public static void RegisterComponents(){
		...
		container.RegisterType<IVehicle, Vehicle>();
		...
	}
}
```
This is the code used in this example:
![Register Type sample](https://user-images.githubusercontent.com/13123625/42966333-2fbd8950-8b73-11e8-9dba-d240d9c8c386.png)

## Creating and Mapping a New Table and Class
In this project there is a fully implemented class, its name is `Values`, as well as the table name in the database, you can use this class as a reference and create as many as you want.<br/>But by coincidence, I need to create a new table to record some pets, so I'll enjoy to explain a little better how to create a new class.<br/>First, go to the `Models` folder and create a new class, call it `Pets` and create two attributes, `Id` and `Name`.<br/>
![Add New Class](https://user-images.githubusercontent.com/13123625/43009053-faeb71b0-8c12-11e8-9ee4-11be8f15c112.png)<br/>And this is our new model class:<br/>
```d
public class Pets {
	[Key]
	[Required]
	public int Id { get; set; }

	[Required]
	[MaxLength(20)]
	public string Name { get; set; }
}
```
For this new class to be recognized as a table in the database, we need to register it in the application's DbContext by adding a new reference in the `Core\MySQLDbContext` class.<br/>
![image](https://user-images.githubusercontent.com/13123625/43014820-d71b61da-8c23-11e8-9fcc-fe28d24d81fa.png)<br/>
Now, do you remember when I said "we need a contract between a class and an interface so we can use dependency injection"? To help with this process I have created a base Interface to perform the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) process, called `ICrudPersistence` and using generics, it can map the specific class.
```d
public interface ICrudPersistence<T> {
	T Save(T item);
	T Load(params object[] keys);
	bool Delete(params object[] keys);
	IEnumerable<T> Query(params object[] keys);
}
```
Before continuing, it is worth remembering that we are about to provide a path in the API URL to load and save changes related to this new class and we'll need an interface that knows what to do with this object when a database operation is requested.<br/>
Fortunately, this part is relatively simple, we just need to extend the generic interface `ICrudPersistence` to one more specific interface to handle with the `Pets` class. This interface will be responsible for the persistence of information with the database, so I usually put it in the `PersistenceIntf` folder, and the code stays that way, only extending the methods of the base interface, this will be called`IPetsPersist`.
```d
public interface IPetsPersist : ICrudPersistence<Pets> { }
```
Now let's create the class that will implement this interface, which will be our first to use dependency injection. Following this pattern of persistence, I usually put this kind of class inside the `Persistence` folder. I will try to simplify as much as possible, for this I will use the [Dapper ORM](http://dapper-tutorial.net/).
```d
public class PetsPersist : IPetsPersist {
	private readonly IAppContext _context;
	private DbConnection Db => _context.Connection();

	public PetsPersist(IAppContext context){
		_context = context;
	}

	public bool Delete(params object[] keys){
		var id = Convert.ToInt32(keys[0]);
		var rowCount = Db.Execute($"delete from pets where id = {id}");

		return (rowCount > 0);
	}

	public Pets Load(params object[] keys){
		var id = Convert.ToInt32(keys[0]);
		var obj = Db.Query<Pets>($"select id, name from pets where id = {id}").FirstOrDefault();

		return obj;
	}

	public IEnumerable<Pets> Query(params object[] keys){
		var list = Db.Query<Pets>("select id, name from pets");
		return list;
	}

	public Pets Save(Pets item){
		_context.DataContext().Pets.AddOrUpdate(item);
		_context.DataContext().SaveChanges();

		return item;
	}
}
```
After this beautiful creation, we need to register this association in the `UnityConfig` class.
```d
container.RegisterType<IPetsPersist, PetsPersist>();
```
Last but not least, we have to register this new class so that Migration can create it in the database. Since this project already has the Migration configuration, we just need to register the new table, and to do this, open the Package Manager Console, and run the command **Add-Migration** passing the name of the new migration as the parameter.
```cmd
PM> Add-Migration PatsTable
```
This command will generate a new file with the `DbMigration` class containing the changes.
```d
public partial class PatsTable : DbMigration {
	public override void Up() {
		CreateTable(
			"dbo.Pets",
			c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Name = c.String(nullable: false, maxLength: 20, storeType: "nvarchar"),
				})
			.PrimaryKey(t => t.Id);           
	}
        
	public override void Down() {
		DropTable("dbo.Pets");
	}
}
```
