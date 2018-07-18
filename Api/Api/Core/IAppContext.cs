using System;
using System.Data.Entity;
using System.Transactions;
using System.Data.Common;

namespace Api.Core
{
    public interface IAppContext
    {
        DbConnection Connection();
    }
}
