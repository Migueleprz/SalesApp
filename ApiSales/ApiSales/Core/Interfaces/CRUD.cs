namespace ApiSales.Core.Interfaces;

public interface ICrud <T>
{
    Task<IEnumerable<T>> Read();
    Task<bool> Create(T data);
    Task<bool> Update(T data);
    Task<bool> Delete(T data);
    
    
}