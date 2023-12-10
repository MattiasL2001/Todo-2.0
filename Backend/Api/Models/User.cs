namespace Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public List<Todo> Todos { get; set; } = new List<Todo>();
        public string UserName { get; set; } = string.Empty;
        private string Password { get; set; } = string.Empty.ToString();
        public string PasswordHash
        {
            get => Password;
            set => Password = HashPassword(value);
        }

        private string HashPassword(string password)
        {
            return password;
        }
    }
}
