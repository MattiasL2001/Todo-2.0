using Api.Models;

namespace Api.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<User> GetUser(string username);
        Task<User> AddUser(string userName, string password);
        Task<List<Todo>> GetUserTodos(int id);
        Task<User> DeleteUser(int id);
        Task<bool> IsUserNameTaken(string userName);
        Task<List<Todo>> AddTodo(Todo todo, int id);
        Task<Todo> GetTodo(int userId, int todoId);
        Task<Todo> UpdateTodo(int userId, int todoId, Todo updatedTodo);
        Task<Todo> DeleteTodo(int userId, int todoId);
    }
}
