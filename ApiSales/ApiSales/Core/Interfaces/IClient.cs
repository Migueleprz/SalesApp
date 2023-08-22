using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface IClient : ICrud<Clients>
{
    Task<Clients> Get(int id);
}