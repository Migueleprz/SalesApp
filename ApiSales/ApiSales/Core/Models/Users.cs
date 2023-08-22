namespace ApiSales.Core.Models;

public class Users
{
    public int Id { get; set; }
    public string Names { get; set; }
    public string LastNames { get; set; }
    public string Dni { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string? Image { get; set; }
    public int Role_id { get; set; }
}