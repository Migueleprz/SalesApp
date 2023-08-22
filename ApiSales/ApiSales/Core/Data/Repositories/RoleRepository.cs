using ApiSales.Core.Data;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace ApiSales.Core.Repositories;

public class RoleRepository : IRole
{
    private readonly MySqlConfig _mySqlConn;
    public RoleRepository(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }

    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }
    public async Task<IEnumerable<Roles>> Read()
    {
        var db = DbConn();
        var sql = @"select id, name from roles order by name asc;";
        return await db.QueryAsync<Roles>(sql, new { });
    }

    public async Task<bool> Create(Roles data)
    {
        var db = DbConn();
        var sql = @"insert into roles (name) values (@Name)";
        var rol = await db.ExecuteAsync(sql, new {data.Name});
        return rol > 0;

    }

    public async Task<bool> Update(Roles data)
    {
        var db = DbConn();
        var sql = @"update roles set name = @Name where id = @Id";
        var rol = await db.ExecuteAsync(sql, new {data.Name, data.Id});
        return rol > 0;
    }

    public async Task<bool> Delete(Roles data)
    {
        var db = DbConn();
        var sql = @"delete from roles where id = @Id";
        var rol = await db.ExecuteAsync(sql, new {Id = data.Id});
        return rol > 0;
    }

    public async Task<Roles> Get(int id)
    {
        var db = DbConn();
        var sql = @"select id, name from roles where id = @Id;";
        return await db.QueryFirstOrDefaultAsync<Roles>(sql, new {Id = id });
    }
}