using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface ISaleDetail: ICrud<SaleDetailProduct>
{
    Task<SaleDetailProduct> Get(int id);
}