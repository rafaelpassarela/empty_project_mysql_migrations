using System.Linq;

namespace Api.Core
{
    public interface ICrudPersistence<T>
    {
        T Save(T item);
        T Load(params object[] keys);
        bool Delete(params object[] keys);
        IQueryable<T> Query(params object[] keys);       
    }
}
