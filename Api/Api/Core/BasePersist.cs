using System.Data.Common;

namespace Api.Core
{
    public class BasePersist
    {
        private readonly IAppContext _context;
        private DbConnection Db => _context.Connection();

        public BasePersist(IAppContext context)
        {
            _context = context;
        }
    }
}