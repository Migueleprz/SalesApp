using ApiSales.Core.Data;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using ApiSales.Core.Utils.Common;
using Dapper;
using MySql.Data.MySqlClient;

namespace ApiSales.Core.Repositories;

public class UserRepository : IUser
{
    private readonly MySqlConfig _mySqlConn;
    
    public UserRepository(MySqlConfig mySqlConn)
    {
        _mySqlConn = mySqlConn;
    }
    
    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }
    public async Task<IEnumerable<Users>> Read()
    {
        var db = DbConn();
        var sql = @"SELECT id, names, lastnames, dni, email, role_id, image FROM users ORDER BY dni ASC;";
        return await db.QueryAsync<Users>(sql, new {});
    }

    public async Task<bool> Create(Users data)
    {
        var crypt = new RipPassword();
        var db = DbConn();
        var sql = @"INSERT INTO users (names, lastnames, dni, email, password, role_id) VALUE (@Names, @LastNames, @Dni, @Email, @Password, @Role_id);";
        data.Password = crypt.Rip(data.Password);
        var res = await db.ExecuteAsync(sql, new {data.Names, data.LastNames, data.Dni, data.Email, data.Password, data.Role_id });
        return res > 0;
    }

    public async Task<bool> Update(Users data)
    {
        var db = DbConn();
        var sql = @"UPDATE users SET names = @Names, lastnames = @LastNames, dni =  @Dni, email = @Email WHERE id = @Id;";
        var res = await db.ExecuteAsync(sql, new {data.Names, data.LastNames, data.Dni, data.Email, data.Id });
        return res > 0;
    }

    public async Task<bool> Delete(Users data)
    {
        var db = DbConn();
        var sql = @"DELETE FROM users WHERE id = @Id;";
        var res = await db.ExecuteAsync(sql, new {id = data.Id });
        return res > 0;
    }

    public async Task<Clients> Get(int id)
    {
        var db = DbConn();
        var sql = @"SELECT id, names, lasnames, dni, email, image FROM users WHERE id = @Id;";
        return await db.QueryFirstOrDefaultAsync<Clients>(sql, new {Id = id});
    }
}