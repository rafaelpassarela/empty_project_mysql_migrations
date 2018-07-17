using System.Linq;

namespace ApiPlanet.Core
{
    public interface ICrudPersistence<T>
    {
        T Save(T item);
        T Load(params object[] keys);
        T Delete(params object[] keys);
        IQueryable<T> Query(params object[] keys);       
    }
}
