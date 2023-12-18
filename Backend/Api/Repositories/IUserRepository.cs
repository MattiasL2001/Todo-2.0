using Api.Dtos;
using Api.Models;

namespace Api.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsers();
        Task<User> AddUser();
        Task<Todo> AddTodo(Todo todo);
        Task<List<Todo>> GetTodo(int todoId, User user);
        Task<List<Todo>> GetUserTodos(int id);
        Task<Todo> UpdateTodo(int todoId, User user);
        Task<Todo> DeleteTodo(int todoId, User user);
    }
}
