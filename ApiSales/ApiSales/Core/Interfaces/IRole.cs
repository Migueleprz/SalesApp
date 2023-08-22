using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface IRole : ICrud<Roles>
{
    Task<Roles> Get(int id);
}