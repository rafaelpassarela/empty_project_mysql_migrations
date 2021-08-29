using System.Data.Common;

namespace Api.Core
{
    public interface IAppContext
    {
        DbConnection Connection();
        MySQLDbContext CurrentContext();
    }
}
