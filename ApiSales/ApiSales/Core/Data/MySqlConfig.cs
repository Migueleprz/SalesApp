namespace ApiSales.Core.Data;

public class MySqlConfig
{
    public MySqlConfig(string? mySqlConnectionString)
    {
        MySqlConnectionString = mySqlConnectionString;
    }
    public string? MySqlConnectionString { get; set; }
}