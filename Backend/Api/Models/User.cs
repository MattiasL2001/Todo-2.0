
namespace Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public List<Todo> Todos { get; set; } = new List<Todo>();
        public string UserName { get; set; } = string.Empty;
        public string PasswordHash { get; set; }

        public User() { }

        public User(int id, List<Todo> todos, string userName, string passwordHash)
        {
            Id = id;
            Todos = todos;
            UserName = userName;
            PasswordHash = passwordHash;
        }
    }
}
