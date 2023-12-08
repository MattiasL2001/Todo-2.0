using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Dtos;
using Api.Repositories;
using AutoMapper;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TodosController> _logger;

        public TodosController(ITodoRepository todoRepository, IMapper mapper, ILogger<TodosController> logger)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoDto>>> GetTodos()
        {
            var todos = await _todoRepository.GetTodos();
            var todosDto = _mapper.Map<List<TodoDto>>(todos);
            return Ok(todosDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo(int id)
        {
            var todo = await _todoRepository.GetTodo(id);
            if (todo == null) { return NotFound(); }

            var todoDto = _mapper.Map<TodoDto>(todo);

            return Ok(todoDto);
        }

        [HttpPost]
        public async Task<ActionResult<TodoDto>> PostTodo(Todo todo)
        {
            var createdTodo = await _todoRepository.AddTodo(todo);
            return CreatedAtAction("GetTodo", new { id = createdTodo.Id }, value: createdTodo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Todo>> PutTodo(int id, Todo todo)
        {
            var updatedTodo = await _todoRepository.UpdateTodo(id, todo);

            if (updatedTodo == null) { return BadRequest(); }

            var todoDto = _mapper.Map<TodoDto>(updatedTodo);
            return Ok(todoDto);
        }

        [HttpDelete(template: "{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            try
            {
                var todo = await _todoRepository.DeleteTodoById(id);

                if (todo == null)
                {
                    _logger.LogWarning(message: "Todo with id: {id} was not found", id);
                    return NotFound();
                }

                _logger.LogInformation(message: "Todo with id {id} was deleted", id);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, message: "Error while trying to delete todo with id: {id}", id);
                return StatusCode(500, value: "Internal Server Error");
            }
        }
    }
}