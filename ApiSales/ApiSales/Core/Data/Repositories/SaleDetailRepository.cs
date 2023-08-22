using ApiSales.Core.Data;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace ApiSales.Core.Repositories;

public class SaleDetailRepository : ISaleDetail
{
    private readonly MySqlConfig _mySqlConn;



    public SaleDetailRepository(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }

    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }
    
    public async Task<IEnumerable<SaleDetailProduct>> Read()
    {
        var db = DbConn();
        var sql = @"SELECT sd.id, p.name AS product, sd.base_price, sd.amount, sd.value, sd.sale_id, sd.product_id 
                    FROM sales_details AS sd 
                    INNER JOIN sales AS s ON sd.product_id = s.id
                    INNER JOIN products AS p ON sd.product_id = p.id;";
        return await db.QueryAsync<SaleDetailProduct>(sql, new {});
    }

    public async Task<bool> Create(SaleDetailProduct data)
    {
        var db = DbConn();
        var productr = new ProductRepository(new MySqlConfig(_mySqlConn.MySqlConnectionString));
        
        var x = await productr.SubtractStock(data.Product_id, data.Amount);
        var sql = @"INSERT INTO sales_details (sale_id, product_id, base_price, amount, value) VALUES (@Sale_id, @Product_id, @Base_price, @Amount, @Value);";
        var res = await db.ExecuteAsync(sql, new { data.Sale_id, data.Product_id, data.Base_price, data.Amount, data.Value });
     
        return  x;
        
    }

    public async Task<bool> Update(SaleDetailProduct data)
    {
        var db = DbConn();
        var sql = @"UPDATE sales_details AS sd SET sd.sale_id = @Sale_id, sd.product_id = @Product_id, sd.base_price = @Base_price, sd.amount = @Amount, sd.value = @Value WHERE id = @Id;";
        var res = await db.ExecuteAsync(sql, new { data.Sale_id, data.Product_id, data.Base_price, data.Amount, data.Value, data.Id });
        return res > 0;
    }

    public async Task<bool> Delete(SaleDetailProduct data)
    {
        var db = DbConn();
        
        var productr = new ProductRepository(new MySqlConfig(_mySqlConn.MySqlConnectionString));
        var x = await productr.AddStock(data.Product_id, data.Amount);
        
        var sql = @"DELETE FROM sales_details WHERE id = @Id;";
        var res = await db.ExecuteAsync(sql, new { Id = data.Id });
        return x;
    }

    public async Task<SaleDetailProduct> Get(int id)
    {
        var db = DbConn();
        var sql = @"SELECT * FROM sales_details WHERE id = @Id;";
        return await db.QueryFirstOrDefaultAsync<SaleDetailProduct>(sql, new {Id = id});
    }
}