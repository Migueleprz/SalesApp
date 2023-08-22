using ApiSales.Core.Data;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace ApiSales.Core.Repositories;

public class SaleRepository : ISale
{
    private readonly MySqlConfig _mySqlConn;

    public SaleRepository(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }
    
    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }
    public async Task<IEnumerable<SalesClient>> Read()
    {
        var db = DbConn();
        var sql = @"SELECT s.id, s.date_sale, s.code, c.dni, CONCAT(c.names,' ',c.lastnames) AS client, s.client_id, s.value_sale FROM sales AS s INNER JOIN clients AS c ON c.id = s.client_id ORDER BY s.date_sale DESC;";
        return await db.QueryAsync<SalesClient>(sql, new {});
    }

    public async Task<bool> Create(SalesClient data)
    {
        var db = DbConn();
        var sql = @"INSERT INTO sales (code, client_id, date_sale) VALUE (@Code, @Client_id, @Date_sale);";
        var res = await db.ExecuteAsync(sql, new {data.Code, data.Client_id, data.Date_sale });
        return res > 0;

    }

    public async Task<bool> Update(SalesClient data)
    {
        var db = DbConn();
        var sql = @"UPDATE sales set code = @Code, client_id = @Client_id, date_sale = @Date_sale, value_sale = @Value_sale WHERE id = @Id;";
        var res = await db.ExecuteAsync(sql, new
            {data.Code, data.Client_id, data.Date_sale, data.Value_sale, data.Id });
        return res > 0;
    }

    public async Task<bool> Delete(SalesClient data)
    {
        var db = DbConn();
        var sql = @"DELETE FROM sales WHERE id = @Id";
        int res = await db.ExecuteAsync(sql, new {id = data.Id });
        return res > 0;
    }

    public async Task<SalesClient> Get(int id)
    {
        var db = DbConn();
        var sql = @"SELECT * FROM sales WHERE id = @Id";
        return await db.QueryFirstOrDefaultAsync<SalesClient>(sql, new {Id = id});
    }
}