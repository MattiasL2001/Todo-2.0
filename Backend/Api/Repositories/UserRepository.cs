﻿using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext userContext)
        {
            _context = userContext;
        }

        public async Task<Todo> AddTodo(Todo todo, User user)
        {
            user.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<List<Todo>> GetUserTodos(int todoId)
        {
            var user = await _context.Users.FindAsync(todoId);

            if (user.Todos != null) { return user.Todos; }

            return null;
        }

        public async Task<List<Todo>> GetTodo(int todoId, User user)
        {
            var u = await _context.Users.FindAsync(user.Id);
            var todo = u.Todos.FirstOrDefault(todo => todo.Id == todoId);
            return u.Todos;
        }

        public async Task<Todo> UpdateTodo(int todoId, User user)
        {
            var todo = user.Todos.FirstOrDefault(todo => todo.Id == todoId);
            _context.Entry(user.Todos).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo> DeleteTodo(int todoId, User user)
        {
            var todo = user.Todos.FirstOrDefault(todo => todo.Id == todoId);
            _context.Remove(todo);
            await _context.SaveChangesAsync();
            return todo;
        }
    }
}
