using ApiSales.Core.Interfaces;
using ApiSales.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ApiSales.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : Controller
{
    private readonly IAuth _auth;

    public AuthController(IAuth auth)
    {
        _auth = auth;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] Auth auth)
    {
        try
        {
            return Ok(await _auth.Login(auth));
        }
        catch (NullReferenceException e)
        {
            return NotFound("Credenciales Incorrectas");
        }
        catch (Exception e)
        {
            return NotFound(e.Message);

        }
    }
}