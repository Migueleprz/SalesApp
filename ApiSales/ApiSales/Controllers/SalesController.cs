using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSales.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SalesController : Controller
{
    private readonly ISale _sale;

    public SalesController(ISale sale)
    {
        _sale = sale;
    }
    
    [HttpGet]
    public async Task<ActionResult> ReadSales()
    {
        return Ok(await _sale.Read());
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateSale([FromBody] SalesClient sales)
    {
        if (sales == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        var res = await _sale.Create(sales);
        return Created("create", res);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateSale([FromBody] SalesClient sales)
    {
        if (sales == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        await _sale.Update(sales);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSale(int id)
    {
        await _sale.Delete(new SalesClient { Id = id });
        return NoContent();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetSale(int id)
    {
        return  Ok(await _sale.Get(id));
    }
    
    
}