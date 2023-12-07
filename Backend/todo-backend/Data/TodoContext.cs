using Microsoft.EntityFrameworkCore;
using todo_backend.Models;

namespace todo_backend.Data
{
    public class TodoContext: DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<Todo> Todos { get; set; }
    }
}
