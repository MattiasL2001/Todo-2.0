namespace Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public List<Todo> Todos { get; set; }
        public string UserName { get; set; } = string.Empty;
        private string Password { get; set; } = string.Empty;

        public User() { }

        public User(int id, List<Todo> todos, string userName, string password)
        {
            Id = id;
            Todos = todos;
            UserName = userName;
            Password = password;
        }
    }
}
