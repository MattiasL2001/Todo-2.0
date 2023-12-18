//using Api.Migrations;
//using Api.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Api.Repositories;

//public class TodoRepository : ITodoRepository
//{
//    private readonly TodoContext _context;

//    public TodoRepository(TodoContext context)
//    {
//        _context = context;
//    }

//    public async Task<Todo> AddTodo(Todo todo)
//    {
//        _context.Todos.Add(todo);
//        await _context.SaveChangesAsync();
//        return todo;
//    }

//    public async Task<Todo> DeleteTodoById(int id)
//    {
//        var todo = await _context.Todos.FindAsync(id);
//        if (todo == null) { return null; }

//       _context.Todos.Remove(todo);
//       await  _context.SaveChangesAsync();
//       return todo;
//    }

//    public async Task<Todo> GetTodo(int id)
//    {
//        return await _context.Todos.FindAsync(id);
//    }

//    public async Task<List<Todo>> GetTodos()
//    {
//        return await _context.Todos.ToListAsync();
//    }

//    public async Task<Todo> UpdateTodo(int id, Todo todo)
//    {
//        if (id != todo.Id) { return null; }

//        _context.Entry(todo).State = EntityState.Modified;
//        await _context.SaveChangesAsync();

//        return todo;
//    }
//}