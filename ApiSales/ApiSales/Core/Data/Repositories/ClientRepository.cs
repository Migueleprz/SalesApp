using ApiSales.Core.Data;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace ApiSales.Core.Repositories;

public class ClientRepository : IClient
{
    private readonly MySqlConfig _mySqlConn;

    public ClientRepository(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }
    
    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }
    public async Task<IEnumerable<Clients>> Read()
    {
        var db = DbConn();
        var sql = @"select * from clients order by names desc;";
        return await db.QueryAsync<Clients>(sql, new {});
    }

    public async Task<bool> Create(Clients data)
    {
        var db = DbConn();
        var sql = @"insert into clients(dni, names, lastnames, dir, phone) values (@Dni, @Names, @LastNames, @Dir, @Phone);";
        var res = await db.ExecuteAsync(sql, new
            {
                data.Dni,
                data.Names,
                data.LastNames,
                data.Dir,
                data.Phone
            });
        return res > 0;
    }

    public async Task<bool> Update(Clients data)
    {
        var db = DbConn();
        var sql = @"update clients set dni = @Dni, names = @Names, lastnames = @LastNames, dir = @Dir, phone = @Phone where id = @Id;";
        var res = await db.ExecuteAsync(sql, new
        {
            data.Dni,
            data.Names,
            data.LastNames,
            data.Dir,
            data.Phone,
            data.Id
        });
        return res > 0;
    }

    public async Task<bool> Delete(Clients data)
    {
        var db = DbConn();
        var sql = @"delete from clients where id = @Id;";
        var res = await db.ExecuteAsync(sql, new
            { Id = data.Id});
        return res > 0;
    }

    public async Task<Clients> Get(int id)
    {
        var db = DbConn();
        var sql = @"select * from clients where id = @Id;";
        return await db.QueryFirstOrDefaultAsync<Clients>(sql, new {Id = id});
    }
}