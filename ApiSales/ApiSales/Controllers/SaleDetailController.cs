using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSales.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SaleDetailController : Controller
{
    private ISaleDetail _saleDetail;
    
    public SaleDetailController(ISaleDetail saleDetail)
    {
        _saleDetail = saleDetail;
    }
    
    [HttpGet]
    public async Task<ActionResult> ReadSalesD()
    {
        return Ok(await _saleDetail.Read());
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateSalesD([FromBody] SaleDetailProduct salesDetails)
    {
        if (salesDetails == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        var res = await _saleDetail.Create(salesDetails);
        return Created("create", res);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateSalesD([FromBody] SaleDetailProduct salesDetails)
    {
        if (salesDetails == null) BadRequest();
        if (!ModelState.IsValid) BadRequest(ModelState);
        await _saleDetail.Update(salesDetails);
        return NoContent();
    }
    
    [HttpDelete("{id}/{productId}/{amount}")]
    public async Task<ActionResult> DeleteSalesD(int id, int productId, int amount)
    {
        await _saleDetail.Delete(new SaleDetailProduct { Id = id, Product_id = productId, Amount = amount});
        return NoContent();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetSalesD(int id)
    {
        return  Ok(await _saleDetail.Get(id));
    }

}
