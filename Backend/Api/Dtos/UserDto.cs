using Api.Models;

namespace Api.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public List<Todo> Todos { get; set; }
        public string UserName { get; set; } = string.Empty;

        public UserDto(int id, List<Todo> todos, string userName)
        {
            Id = id;
            Todos = todos;
            UserName = userName;
        }
    }
}
