using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSales.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class RoleController : Controller
{
    private readonly IRole _role;

    public RoleController(IRole role)
    {
        _role = role;
    }

    [HttpGet]
    public async Task<ActionResult> ReadRoles()
    {
        return Ok(await _role.Read());
    }

    [HttpPost]
    public async Task<ActionResult> CreateRol([FromBody] Roles roles)
    {
        if (roles == null) return BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        var res = await _role.Create(roles);
        return Created("created", res);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateRol([FromBody] Roles roles)
    {
        if (roles == null) return BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        await _role.Update(roles);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRol(int id)
    {
        await _role.Delete(new Roles {Id = id});
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetRol(int id)
    {
        return Ok(await _role.Get(id));
    }
}