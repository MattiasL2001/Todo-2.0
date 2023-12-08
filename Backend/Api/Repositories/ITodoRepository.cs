using Api.Models;

namespace Api.Repositories
{
    public interface ITodoRepository
    {
        Task<Todo> AddTodo(Todo todo);
        Task<Todo> DeleteTodoById(int id);
        Task<Todo> GetTodo(int id);
        Task<List<Todo>> GetTodos();
        Task<Todo> UpdateTodo(int id, Todo todo);
    }
}
