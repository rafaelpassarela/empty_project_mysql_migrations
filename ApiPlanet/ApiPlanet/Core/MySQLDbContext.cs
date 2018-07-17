using System;
using ApiPlanet.Models;
using ApiPlanet.Core;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Common;
using ApiPlanet.Migrations;
using ApiPlanet.MySQLMigrationHistory;



/* enable-migrations
 * add-migration Initial
 * 
 * Constructor of Migrations/Config.cs -> SetSqlGenerator("MySql.Data.MySqlClient", new MySql.Data.Entity.MySqlMigrationSqlGenerator());
 * 
 * */

namespace ApiPlanet.Core
{
    public class MySQLDbContext : DbContext, IAppContext
    {
        static MySQLDbContext()
        {
            Database.SetInitializer(new MySqlInitializer());
        }

        public MySQLDbContext() : base("PlanetDB")
        {
            Configuration.AutoDetectChangesEnabled = false;
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;

            var init = new MySqlInitializer();
            init.InitializeDatabase(this);

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MySQLDbContext, Configuration>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbConnection Connection()
        {
            return Database.Connection;
        }

        // List of all tables and models
        public DbSet<Values> Values { get; set; }
    }
}
