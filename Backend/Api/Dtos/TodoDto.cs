namespace Api.Dtos
{
    public class TodoDto
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
    }
}
