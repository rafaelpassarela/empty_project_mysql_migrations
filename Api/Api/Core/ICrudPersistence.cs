using System.Collections.Generic;

namespace Api.Core
{
    public interface ICrudPersistence<T>
    {
        T Save(T item);
        T Load(params object[] keys);
        bool Delete(params object[] keys);
        IEnumerable<T> Query(params object[] keys);
    }
}
