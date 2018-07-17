using System;
using System.Data.Entity;
using System.Transactions;
using System.Data.Common;

namespace ApiPlanet.Core
{
    public interface IAppContext
    {
        DbConnection Connection();
    }
}
