using Api.Dtos;
using Api.Models;

namespace Api.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsers();
        Task<User> AddUser(string userName, string password);
        Task<bool> IsUserNameTaken(string userName);
        Task<List<Todo>> AddTodo(Todo todo, int id);
        Task<Todo> GetTodo(int userId, int todoId);
        Task<List<Todo>> GetUserTodos(int id);
        Task<Todo> UpdateTodo(int todoId, User user);
        Task<Todo> DeleteTodo(int todoId, User user);
    }
}
