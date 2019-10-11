using Api.Core;
using Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace Api
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            // Allows cors for the /token endpoint this is different from webapi endpoints.
            //if (context.Request.Path.Value.ToUpper().Contains("/TOKEN"))
            //{
            //    context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            //    context.Response.Headers.Add("Access-Control-Allow-Headers", new[] {
            //        "origin,x-auth-token,client-security-token,access-control-allow-origin,authorization,content-type,mycustom-header" });
            //    //"origin", "x-auth-token", "client-security-token",
            //    //"access-control-allow-origin", "authorization",
            //    //"content-type", "mycustom-header" });
            //    context.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET,POST,PATCH,PUT,DELETE,OPTIONS" });
            //    //"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS" });
            //    if (context.Request.Method == "OPTIONS")
            //    {
            //        context.Response.StatusCode = 200;
            //        context.Response.ReasonPhrase = "OK";
            //    }
            //}

            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<MySQLDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    public class ApplicationRoleManager : RoleManager<IdentityRole, string>
    {
        public ApplicationRoleManager(IRoleStore<IdentityRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            return new ApplicationRoleManager(new RoleStore<IdentityRole>(context.Get<MySQLDbContext>()));
        }
    }
}
