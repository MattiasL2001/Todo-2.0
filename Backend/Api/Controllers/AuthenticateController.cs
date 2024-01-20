using Api.Dtos;
using Api.Models;
using Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;
        private int passwordMinimumLength = 5;

        public AuthenticateController(IAuthenticate authenticate)
        {
            _authenticate = authenticate;
        }

        [HttpPost("/register")]
        public async Task<ActionResult<UserDto>> Register(UserRegistration user)
        {
            if (await _authenticate.IsUserNameTaken(user.Username))
            {
                Console.WriteLine($"{user.Username} is taken!");
                return Conflict("Username already exists!");
            }
            if (user.Password.Length < passwordMinimumLength)
            {
                Console.WriteLine("Bad password!");
                return Conflict("Password need to include at minimum 5 characters!");
            }

            var userObj = await _authenticate.Register(user.Username, user.Password);
            return Ok(userObj);
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] UserAuthenticationDto userDto)
        {
            if (ModelState.IsValid)
            {
                var user = await _authenticate.ValidateCredentials(userDto.UserName, userDto.Password);

                if (user == null) { return Unauthorized("Could not find a user with matching credentials"); }

                return Ok(user);
            }

            return Unauthorized("Invalid username or password!");
        }

        [HttpPost("/logout")]
        public async Task<IActionResult> Logout()
        {
            await _authenticate.Logout();
            return Ok("Logout successful");
        }

        [HttpDelete("/delete")]
        public async Task<IActionResult> DeleteUser(UserAuthenticationDto userDto)
        {
            var user = await _authenticate.ValidateCredentials(userDto.UserName, userDto.Password);

            if (user == null) { return Unauthorized("Could not find a user with matching credentials"); }

            _authenticate.DeleteAccount(user);
            return Ok(user);
        }
    }
}
