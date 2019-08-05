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

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MySQLDbContext, Configuration>());

            var init = new MySqlInitializer();
            init.InitializeDatabase(this);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbConnection Connection()
        {
            return Database.Connection;
        }

        public MySQLDbContext DataContext()
        {
            return this;
        }

        // List of all tables/models
        public DbSet<Values> Values { get; set; }
    }
}
