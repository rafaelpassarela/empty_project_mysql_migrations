using System.Data.Common;

namespace Api.Core
{
    public class BasePersist
    {
        protected readonly IAppContext _context;
        protected DbConnection Db => _context.Connection();

        public BasePersist(IAppContext context)
        {
            _context = context;
        }
    }
}