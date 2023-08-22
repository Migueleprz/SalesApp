using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface IUser : ICrud<Users>
{
    Task<Clients> Get(int id);
}