using Api.Dtos;
using Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;

        public AuthenticateController(IAuthenticate authenticate)
        {
            _authenticate = authenticate;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserAuthenticationDto userAuthDto)
        {
            if (ModelState.IsValid)
            {
                var result = await _authenticate.Register(userAuthDto.UserName, userAuthDto.Password);
                if (result)
                {
                    return Ok("Registration successful");
                }
                else
                {
                    return BadRequest("Username already exists!");
                }
            }

            return BadRequest("Registration failed");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAuthenticationDto userDto)
        {
            Console.WriteLine("login attempted");
            if (ModelState.IsValid)
            {
                var user = await _authenticate.Login(userDto.UserName, userDto.Password);

                if (user == null) { return Unauthorized("Could not find a user with matching credentials"); }

                return Ok(user);
            }

            return Unauthorized("Invalid username or password!");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authenticate.Logout();
            return Ok("Logout successful");
        }
    }
}
