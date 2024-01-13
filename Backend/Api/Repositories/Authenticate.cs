using Microsoft.AspNetCore.Identity;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class AuthenticationService : IAuthenticate
    {
        private readonly UserContext _context;

        public AuthenticationService(UserContext context)
        {
            _context = context;
        }

        public async Task<bool> Register(string username, string password)
        {
            //var findExistingUserWithName = await _context.

            //if (findExistingUserWithName != null) { }

            //if (findExistingUserWithName == null)
            //{
            //    var user = new User { UserName = username };
            //    var result = await _userManager.CreateAsync(user, password);

            //    return result.Succeeded;
            //}

            return false;
        }

        public async Task<User> Login(string username, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u =>
                u.UserName == username && u.PasswordHash == password);

            if (user == null) { return null; }

            return user; // This will return the user if found, otherwise null
        }

        public async Task Logout()
        {
            Console.WriteLine("Logout called");
        }
    }
}
