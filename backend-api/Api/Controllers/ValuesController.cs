﻿using Api.Models;
using Api.PersistenceIntf;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("")]
    public class ValuesController : ApiController
    {
        private readonly IValuesPersist _crud;

        public ValuesController(IValuesPersist valuesPersist)
        {
            _crud = valuesPersist;
        }

        // GET api/values
        public IHttpActionResult Get()
        {
            var list = _crud.Query();

            return Ok(list);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            var obj = _crud.Load(id);

            if (obj == null)
                return NotFound();

            return Ok(obj);
        }

        // POST api/values
        public IHttpActionResult Post([FromBody]Values value)
        {
            _crud.Save(value);
            if (value.Id > 0)
                return Ok(value);

            return NotFound();
        }

        // PUT api/values/5
        public IHttpActionResult Put([FromBody]Values value)
        {
            throw new NotImplementedException();
        }

        public IHttpActionResult Delete(int id)
        {
            if (_crud.Delete(id))
                return Ok();

            return NotFound();
        }
    }
}
