﻿using Api.Models;
using Api.PersistenceIntf;
using System.Web.Http;

namespace Api.Controllers
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
        public IHttpActionResult Post([FromBody]Values value)
        {
            _valuesPersist.Save(value);
            if (value.Id > 0)
                return Ok(value);

            return NotFound();
        }

        public IHttpActionResult Delete(int id)
        {
            if (_valuesPersist.Delete(id))
                return Ok();

            return NotFound();
        }
    }
}
