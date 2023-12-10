using Api.Dtos;
using Api.Models;
using Api.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticateController(SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager, IAuthenticate authenticate)
        {
            _authenticate = authenticate;
            _signInManager = signInManager;
            _userManager = userManager;
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
            if (ModelState.IsValid)
            {
                var token = await _authenticate.Login(userDto.UserName, userDto.Password);

                if (token != null)
                {
                    return Ok(new {Token = token});
                }
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
