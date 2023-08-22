namespace ApiSales.Core.Models;

public class Sales
{
    public int Id { get; set; }
    public string Code { get; set; }
    public int Client_id { get; set; }
    public string Date_sale { get; set; }
    public int? Value_sale { get; set; }
}