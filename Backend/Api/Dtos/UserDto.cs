using Api.Models;

namespace Api.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public List<Todo> Todos { get; set; } = new List<Todo>();

        public string UserName { get; set; } = string.Empty;
    }
}
