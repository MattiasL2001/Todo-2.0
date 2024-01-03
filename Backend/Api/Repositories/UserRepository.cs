using Api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext userContext)
        {
            _context = userContext;
        }

        public async Task<List<User>> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Todos).ToListAsync();
            return users;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) { return null; }
            return user;
        }

        public async Task<User> AddUser(string userName, string password)
        {
            User user = new User(0, null, userName, password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> IsUserNameTaken(string userName)
        {
            var count = await _context.Users.CountAsync(u => u.UserName.ToLower() == userName.ToLower());

            if (count > 0) { return true; }
            return false;
        }

        public async Task<List<Todo>> AddTodo(Todo todo, int id)
        {
            var user = await _context.Users.Include(u => u.Todos).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) { return null; }

            user.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return user.Todos;
        }

        public async Task<List<Todo>> GetUserTodos(int userId)
        {
            var user = await _context.Users.Include(u => u.Todos).FirstOrDefaultAsync(u => u.Id == userId);

            if (user.Todos == null) { return null; }

            return user.Todos;
        }

        public async Task<Todo> GetTodo(int userId, int todoId)
        {
            var user = await _context.Users.Include(u => u.Todos).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) { return null; }

            var todo = user.Todos.FirstOrDefault(todo => todo.Id == todoId);

            return todo;
        }

        public async Task<Todo> UpdateTodo(int userId, int todoId, Todo updatedTodo)
        {
            Todo todo = await GetTodo(userId, todoId);
            if (todo == null) { return null; };
            if (updatedTodo == null) { return null; }
            todo.Title = updatedTodo.Title;
            todo.Completed = updatedTodo.Completed;
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo> DeleteTodo(int userId, int todoId)
        {
            Todo todo = await GetTodo(userId, todoId);
            if (todo == null) { return null; };
            _context.Remove(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<User> DeleteUser(int userId)
        {
            var user = await _context.Users.Include(u => u.Todos).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) { return null; }
            _context.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
