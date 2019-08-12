using Api.Core;
using Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel;

namespace Api.Providers
{
    public enum Roles
    {
        [Description("Admin")]
        Admin,

        [Description("Guest")]
        Guest,

        [Description("User")]
        User,

        [Description("Deactivated")]
        Deactivated
    }

    public class RolesAndUsersDefaultProvider
    {
        private static readonly string adminEmail = "admin@admin.com";
        private static readonly string adminName = "Admin";
        private static readonly string adminPass = "admin123";

        public static void SetupRolesAndUsers(IAppContext appContext)
        {
            var context = appContext.CurrentContext();
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            // add roles
            if (!roleManager.RoleExists(Roles.Guest.ToString()))
                roleManager.Create(new IdentityRole(Roles.Guest.ToString()));

            if (!roleManager.RoleExists(Roles.Deactivated.ToString()))
                roleManager.Create(new IdentityRole(Roles.Deactivated.ToString()));

            if (!roleManager.RoleExists(Roles.User.ToString()))
                roleManager.Create(new IdentityRole(Roles.User.ToString()));

            var adminRole = roleManager.FindByName(Roles.Admin.ToString());
            if (adminRole == null)
            {
                adminRole = new IdentityRole(Roles.Admin.ToString());
                roleManager.Create(adminRole);
            }

            //add admin user
            //var admin = userManager.Find(adminName, adminPass);
            var admin = userManager.FindByEmail(adminEmail);

            if (admin == null)
            {
                admin = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FirstName = adminName,
                    EmailConfirmed = true
                };
                var result = userManager.Create(admin, adminPass);
                if (result.Succeeded)
                {
                    userManager.AddToRole(admin.Id, Roles.Admin.ToString());
                    result = userManager.SetLockoutEnabled(admin.Id, false);
                }
            }

            if (!admin.Id.Trim().Equals(""))
            {
                var rolesForUser = userManager.GetRoles(admin.Id);
                if (!rolesForUser.Contains(adminRole.Name))
                {
                    var result = userManager.AddToRole(admin.Id, adminRole.Name);
                }
            }
        }
    }
}