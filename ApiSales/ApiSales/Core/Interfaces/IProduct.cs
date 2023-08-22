using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface IProduct : ICrud<Products>
{
    Task<Products> Get(int id);
    Task<bool> SubtractStock(int id, int amount);
    Task<bool> AddStock(int id, int amount);
}