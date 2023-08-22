using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSales.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : Controller
{
    private readonly IUser _user;

    public UserController(IUser user)
    {
        _user = user;
    }

    [HttpGet]
    public async Task<ActionResult> ReadUsers()
    {
        return Ok(await _user.Read());
    }

    [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] Users users)
    {
        if (users == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        var res = await _user.Create(users);
        return Created("create", res);
    }
    [HttpPut]
    public async Task<ActionResult> UpdateUser([FromBody] Users users)
    {
        if (users == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        var res = await _user.Update(users);
        return Created("create", res);
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSale(int id)
    {
        await _user.Delete(new Users { Id = id });
        return NoContent();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetSale(int id)
    {
        return  Ok(await _user.Get(id));
    }
}