using MySql.Data.MySqlClient;
namespace ApiSales.Core.Data;

public class Db_Connect
{
    private readonly MySqlConfig _mySqlConn;

    public Db_Connect(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }
    
    public MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }

    public MySqlConnection MySQL()
    {
        return DbConn();
    }
}