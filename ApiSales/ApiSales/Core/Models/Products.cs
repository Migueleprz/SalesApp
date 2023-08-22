namespace ApiSales.Core.Models;

public class Products
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public int Stock { get; set; }
    public int Unit_Price { get; set; }
    public int Whs_Price { get; set; }
    public int Purch_Price { get; set; }
}