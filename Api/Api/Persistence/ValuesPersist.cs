using Api.Core;
using Api.Models;
using Api.PersistenceIntf;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity.Migrations;
using System.Linq;

namespace Api.Persistence
{
    public class ValuesPersist : IValuesPersist
    {
        private readonly IAppContext _context;
        private DbConnection Db => _context.Connection();

        public ValuesPersist(IAppContext context)
        {
            _context = context;
        }

        public bool Delete(params object[] keys)
        {
            var id = Convert.ToInt32(keys[0]);
            var rowCount = Db.Execute($"delete from `values` where id = {id}");

            return (rowCount > 0);
        }

        public Values Load(params object[] keys)
        {
            var id = Convert.ToInt32(keys[0]);

            var obj = Db.Query<Values>($"select id, name from `values` where id = {id}").FirstOrDefault();

            return obj;
        }

        public IEnumerable<Values> Query(params object[] keys)
        {
            var list = Db.Query<Values>("select id, name from `values`").AsQueryable();
            return list;
        }

        public Values Save(Values item)
        {
            _context.DataContext().Values.AddOrUpdate(item);
            //_context.DataContext().Entry(item).State = item.Id == 0 ? EntityState.Added : EntityState.Modified;
            _context.DataContext().SaveChanges();
            return item;
        }
    }
}