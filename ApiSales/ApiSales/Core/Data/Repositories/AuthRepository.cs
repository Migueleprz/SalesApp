using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApiSales.Core.Data;
using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using ApiSales.Core.Utils.Common;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ApiSales.Core.Repositories;

public class AuthRepository : IAuth
{
    private readonly MySqlConfig _mySqlConn;
    public IConfiguration _Configuration;
    
    public AuthRepository(MySqlConfig mySqlConn, IConfiguration? configuration)
    {
        _mySqlConn = mySqlConn;
        _Configuration = configuration;
    }
    
    protected MySqlConnection DbConn()
    {
        return new MySqlConnection(_mySqlConn.MySqlConnectionString);
    }


    public async Task<UserAuth > Login(Auth auth)
    {
        UserAuth  data;
        var rip = new RipPassword();
        auth.password = rip.Rip(auth.password);
        var db = DbConn();
        var sql = @"select id, names, lastnames, email, role_id, image from users where email = @Email and password = @Password";
        data = await db.QueryFirstOrDefaultAsync<UserAuth>(sql, new {Email = auth.email, Password = auth.password});
        var jwt = _Configuration.GetSection("Jwt").Get<Jwt>();
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
        var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            jwt.Issuer,
            jwt.Audience,
            claims,
            expires: DateTime.Now.AddMinutes(1),
            signingCredentials: singIn
            );
        data.Token = new JwtSecurityTokenHandler().WriteToken(token);
        
        return data;

    }

    public Task<bool> Logout(Users users)
    {
        throw new NotImplementedException();
    }
}