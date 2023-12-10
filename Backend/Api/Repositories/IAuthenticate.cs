using Api.Models;
using Microsoft.AspNetCore.Identity;

namespace Api.Repositories
{
    public interface IAuthenticate
    {
        Task<bool> Register(string username, string password);
        Task<string> Login(string username, string password);
        Task Logout();
        string GenerateJwtToken(User user);
    }
}
