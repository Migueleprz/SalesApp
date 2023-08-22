using ApiSales.Core.Models;

namespace ApiSales.Core.Interfaces;

public interface IAuth
{
    public Task<UserAuth > Login(Auth auth);
    public Task<bool> Logout(Users users);
}