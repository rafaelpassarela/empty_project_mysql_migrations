using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApiPlanet.Models;
using ApiPlanet.Persistence;
using ApiPlanet.PersistenceIntf;

// Boomerang SOAP e REST Client
// https://vnextcoder.wordpress.com/2015/10/04/mysql-net-entity-framework-code-first-migration/

namespace ApiPlanet.Controllers
{
    public class ValuesController : ApiController
    {
        private readonly IValuesPersist _valuesPersist;

        public ValuesController(IValuesPersist valuesPersist)
        {
            _valuesPersist = valuesPersist;            
        }

        // GET api/values
        public IHttpActionResult Get()
        {
            var list = _valuesPersist.Query();

            return Ok(list);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            var obj = _valuesPersist.Load(id);

            if (obj == null)
                return NotFound();

            return Ok(obj);
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
