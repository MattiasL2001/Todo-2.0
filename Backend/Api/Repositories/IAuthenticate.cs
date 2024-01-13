using Api.Models;

namespace Api.Repositories
{
    public interface IAuthenticate
    {
        Task<bool> Register(string username, string password);
        Task<User> Login(string username, string password);
        Task Logout();
    }
}
