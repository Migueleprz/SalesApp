using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSales.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ClientController : Controller
{
    private readonly IClient _client;

    public ClientController(IClient client)
    {
        _client = client;
    }

    [HttpGet]
    public async Task<ActionResult> ReadClient()
    {
        return Ok(await _client.Read());
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateClient([FromBody] Clients clients)
    {
        if (clients == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        var res = await _client.Create(clients);
        return Created("create", res);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateClient([FromBody] Clients clients)
    {
        if (clients == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        await _client.Update(clients);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProducts(int id)
    {
        await _client.Delete(new Clients { Id = id });
        return NoContent();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetProduct(int id)
    {
        return  Ok(await _client.Get(id));
    }
}