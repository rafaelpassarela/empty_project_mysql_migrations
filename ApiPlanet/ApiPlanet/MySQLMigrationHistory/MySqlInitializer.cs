using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using ApiPlanet.Core;

namespace ApiPlanet.MySQLMigrationHistory
{
    public class MySqlInitializer : IDatabaseInitializer<MySQLDbContext>
    {
        static private bool isChecked = false;

        public void InitializeDatabase(MySQLDbContext context)
        {
            if (isChecked)
                return;

            isChecked = true;

            if (!context.Database.Exists())
            {
                // if database did not exist before - create it
                context.Database.Create();
            }
            else
            {
                var dbName = context.Database.Connection.Database;
                var sql = $"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '{dbName}' AND table_name = '__MigrationHistory'";
                // query to check if MigrationHistory table is present in the database 
                var migrationHistoryTableExists = ((IObjectContextAdapter)context).ObjectContext.ExecuteStoreQuery<int>(sql);

                // if MigrationHistory table is not there (which is the case first time we run) - create it
                if (migrationHistoryTableExists.FirstOrDefault() == 0)
                {
                    context.Database.Delete();
                    context.Database.Create();
                }
            }
        }
    }
}