using Api.Migrations;
using Api.Models;
using Api.MySQLMigrationHistory;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Common;
using System.Data.Entity;

namespace Api.Core
{
    public class MySQLDbContext : IdentityDbContext<ApplicationUser> /*DbContext*/, IAppContext
    {
        static MySQLDbContext()
        {
            Database.SetInitializer(new MySqlInitializer());
        }

        public static MySQLDbContext Create()
        {
            return new MySQLDbContext();
        }

        public MySQLDbContext() : base("MyConnectionName")
        {
            Configuration.AutoDetectChangesEnabled = true;
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MySQLDbContext, Configuration>());

            var init = new MySqlInitializer();
            init.InitializeDatabase(this);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().Property(x => x.UserName).HasMaxLength(128);
            modelBuilder.Entity<IdentityRole>().Property(x => x.Name).HasMaxLength(128);
        }

        public DbConnection Connection()
        {
            return Database.Connection;
        }

        public MySQLDbContext DataContext()
        {
            return this;
        }

        // Identiy models is already registered

        // List of all tables/models
        public DbSet<Values> Values { get; set; }
    }
}
