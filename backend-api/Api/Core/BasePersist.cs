using System.Data.Common;

/* **************************************************
 * If you got an error loke this: "MySql.Data.Entity.EFMySqlCommand.set_DbConnection(System.Data.Common.DbConnection)'
 * ao tentar acessar o método 'MySql.Data.MySqlClient.MySqlConnection.get_Settings()'.", change the Web.config from
 * THIS
   <dependentAssembly>
     <assemblyIdentity name="MySql.Data" publicKeyToken="c5687fc88969c44d" culture="neutral" />
     <bindingRedirect oldVersion="0.0.0.0-8.0.10.0" newVersion="8.0.10.0" />
   </dependentAssembly>
 * 
 * TO THIS
 * 
   <dependentAssembly>
     <assemblyIdentity name="MySql.Data" publicKeyToken="c5687fc88969c44d" culture="neutral" />
     <bindingRedirect oldVersion="0.0.0.0-6.10.7.0" newVersion="6.10.7.0" />
   </dependentAssembly>
 * 
 * And Api.csproj to refresh the mySQL.Data reference
 * 
   <Reference Include="MySql.Data, Version=6.10.7.0, Culture=neutral, PublicKeyToken=c5687fc88969c44d, processorArchitecture=MSIL">
     <HintPath>..\packages\MySql.Data.6.10.7\lib\net452\MySql.Data.dll</HintPath>
   </Reference>
 * 
 * Make sure to use this version on packages.config
 * 
   <package id="MySql.Data" version="6.10.7" targetFramework="net462" />
   <package id="MySql.Data.Entity" version="6.10.7" targetFramework="net462" />
 * 
 * *************************************************/

namespace Api.Core
{
    public class BasePersist
    {
        protected readonly IAppContext _context;
        protected DbConnection Db => _context.Connection();

        public BasePersist(IAppContext context)
        {
            _context = context;
        }
    }
}