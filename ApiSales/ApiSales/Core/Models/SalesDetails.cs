namespace ApiSales.Core.Models;

public class SalesDetails
{
    public int Id { get; set; }
    public int Sale_id { get; set; }
    public int Product_id { get; set; }
    public int Base_price { get; set; }
    public int Amount { get; set; }
    public int Value { get; set; }
}