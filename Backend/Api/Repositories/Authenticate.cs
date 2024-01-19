using Microsoft.AspNetCore.Identity;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;

namespace Api.Repositories
{
    public class AuthenticationService : IAuthenticate
    {
        private readonly UserContext _context;

        public AuthenticationService(UserContext context)
        {
            _context = context;
        }

        public async Task<User> Register(string username, string password)
        {
            string hashedPassword = HashPassword(password);
            User user = new User(0, username, hashedPassword, new List<Todo>());
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // Convert the password string to bytes
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

                // Compute the hash
                byte[] hashBytes = sha256.ComputeHash(passwordBytes);

                // Convert the hash bytes to a hexadecimal string
                StringBuilder builder = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    builder.Append(b.ToString("x2"));
                }

                return builder.ToString();
            }
        }

        public async Task<bool> IsUserNameTaken(string userName)
        {
            var count = await _context.Users.CountAsync(u => u.UserName.ToLower() == userName.ToLower());

            if (count > 0) { return true; }
            return false;
        }

        public async Task<User> ValidateCredentials(string username, string password)
        {
            string hashedPassword = HashPassword(password);
            User user = await _context.Users.FirstOrDefaultAsync(u =>
                u.UserName == username && u.PasswordHash == hashedPassword);

            if (user == null) { return null; }
            return user;
        }

        public async Task Logout()
        {
            Console.WriteLine("Logout called");
        }

        public async Task<User> DeleteAccount(User user)
        {
            _context.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
