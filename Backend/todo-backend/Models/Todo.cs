namespace todo_backend.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
    }
}
