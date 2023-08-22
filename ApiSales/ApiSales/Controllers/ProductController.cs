using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSales.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProductController : Controller
{
    private readonly IProduct _product;

    public ProductController(IProduct product)
    {
        _product = product;
    }

    [HttpGet]
    public async Task<ActionResult> ReadProducts()
    {
        return Ok(await _product.Read());
    }

    [HttpPost]
    public async Task<ActionResult> CreateProduct([FromBody] Products products)
    {
        if (products == null) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var res = await _product.Create(products);
        return Created("created", res);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateProduct([FromBody] Products products)
    {
        if (products == null) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);
        await _product.Update(products);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProducts(int id)
    {
        await _product.Delete(new Products { Id = id });
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetProduct(int id)
    {
        return  Ok(await _product.Get(id));
    }

}