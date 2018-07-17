using ApiPlanet.Core;
using ApiPlanet.Persistence;
using ApiPlanet.PersistenceIntf;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace ApiPlanet
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            container.RegisterType<IAppContext, MySQLDbContext>();
            container.RegisterType<IValuesPersist, ValuesPersist>();
        }
    }
}