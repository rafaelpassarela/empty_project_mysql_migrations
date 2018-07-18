using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Api.Core;
using Api.Models;
using Dapper;
using Api.PersistenceIntf;

namespace Api.Persistence
{
    public class ValuesPersist : IValuesPersist
    {
        private readonly IAppContext _context;

        public ValuesPersist(IAppContext context)
        {
            _context = context;
        }

        public Values Delete(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Values Load(params object[] keys)
        {
            var id = Convert.ToInt32(keys[0]);

            var obj = _context.Connection().Query<Values>($"select id, name from `values` where id = {id}").FirstOrDefault();
            
            return obj;
        }

        public IQueryable<Values> Query(params object[] keys)
        {
            var list = _context.Connection().Query<Values>("select id, name from `values`").AsQueryable();
            return list;
        }

        public Values Save(Values item)
        {
            //save
            //    _db.CandyPlus_Ticket.AddOrUpdate(values);
            //    _db.Entry(values).State = item.Codigo == 0 ? EntityState.Added : EntityState.Modified;
            //    _db.SaveChanges();

            //    item.Codigo = Values.Id;
            throw new NotImplementedException();
        }
    }
}