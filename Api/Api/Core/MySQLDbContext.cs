using Api.Migrations;
using Api.Models;
using Api.MySQLMigrationHistory;
using System.Data.Common;
using System.Data.Entity;

namespace Api.Core
{
    public class MySQLDbContext : DbContext, IAppContext
    {
        static MySQLDbContext()
        {
            Database.SetInitializer(new MySqlInitializer());
        }

        public MySQLDbContext() : base("MyConnectionName")
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

        // List of all tables/models
        public DbSet<Values> Values { get; set; }
    }
}
