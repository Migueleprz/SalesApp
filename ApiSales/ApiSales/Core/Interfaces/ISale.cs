using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface ISale : ICrud<SalesClient>
{
    Task<SalesClient> Get(int id);
}