using Api.Core;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("")]
    public class RolesController : ApiController
    {
        private readonly IAppContext _db;
        private readonly ApplicationRoleManager _roleManager;

        public RolesController(IAppContext appContext)
        {
            _db = appContext;
            _roleManager = new ApplicationRoleManager(new RoleStore<IdentityRole>(_db.CurrentContext()));
        }

        // GET: Roles
        public IHttpActionResult Get()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]IdentityRole role)
        {
            if (ModelState.IsValid)
            {
                // locate a Role by given ID
                IdentityRole current = _roleManager.Roles.SingleOrDefault(r => r.Id == role.Id);
                if (current == null)
                {
                    await _roleManager.CreateAsync(role);
                }
                else
                {
                    await _roleManager.UpdateAsync(role);
                }

                //var role = _roleManager.Roles.SingleOrDefault(r => r.Id == id.ToString());
                role = _roleManager.Roles.SingleOrDefault(r => r.Id == role.Id);
                if (role == null)
                    return NotFound();

                return Ok(role);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Model State is Invalid"));
        }

        // DELETE: Roles/Delete/5
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            var role = _roleManager.Roles.SingleOrDefault(r => r.Id == id.ToString());
            await _roleManager.DeleteAsync(role);
            return Ok(role);
        }
    }
}