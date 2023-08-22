using ApiSales.Core.Data;
using ApiSales.Core.Data.Queries;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace ApiSales.Core.Repositories;

public class ProductRepository: IProduct
{

    private readonly MySqlConfig _mySqlConn;
    
    
    public ProductRepository(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }

    
    
    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }
    
    public async Task<IEnumerable<Products>> Read()
    {
        var db = DbConn();
        var sql = @"select * from products order by name desc";
        return await db.QueryAsync<Products>(sql, new {});
    }

    public async Task<bool> Create(Products data)
    {
        var db = DbConn();
        var sql = @"insert into products(code, name, stock, unit_price ,whs_price ,purch_price) values (@Code, @Name, @Stock, @Unit_price ,@Whs_price ,@Purch_price)";
        var  res = await db.ExecuteAsync(sql, new
        {
            data.Code, 
            data.Name, 
            data.Stock, 
            data.Unit_Price, 
            data.Whs_Price, 
            data.Purch_Price
        });
         return res > 0;
    }

    public async Task<bool> Update(Products data)
    {
        var db = DbConn();
        var sql = @"update products set code=@Code, name=@Name, stock=@Stock, unit_price=@Unit_price ,whs_price=@Whs_price ,purch_price=@Purch_price where id = @Id";
        var res = await db.ExecuteAsync(sql, new
        {
            data.Code,
            data.Name,
            data.Stock,
            data.Unit_Price,
            data.Whs_Price,
            data.Purch_Price,
            data.Id
        });
        return res > 0;
    }

    public async Task<bool> Delete(Products data)
    {
        var db = DbConn();
        var sql = @"delete from products where id = @Id";
        var res = await db.ExecuteAsync(sql, new{ Id = data.Id });
        return res > 0;
    }

    public async Task<Products> Get(int id)
    {
        var db = DbConn();
        var sql  = @"SELECT * from products where id = @Id";
        return await db.QueryFirstOrDefaultAsync<Products>(sql, new { Id = id });
    }

    public async Task<bool> SubtractStock(int id, int amount)
    {
        var db = DbConn();
        var product = Get(id);
        var stock = product.Result.Stock -  amount;
        var sql = @"UPDATE products SET stock = @Stock WHERE id = @Id";
        var res = await db.ExecuteAsync(sql, new{ Stock = stock, Id = id  });
        return res > 0;
    }

    public async Task<bool> AddStock(int id, int amount)
    {
        var db = DbConn();
        var stockp = Get(id).Result.Stock;
        var stock = stockp  +  amount;
        var sql = @"UPDATE products SET stock = @Stock WHERE id = @Id";
        var res = await db.ExecuteAsync(sql, new{ Stock = stock, Id = id });
        return res > 0;
    }
}