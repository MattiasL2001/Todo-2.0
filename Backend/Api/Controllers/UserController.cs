using Api.Dtos;
using Api.Models;
using Api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepository userRepository, IMapper mapper, ILogger<UserController> logger)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("/users")]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            List<User> users = await _userRepository.GetUsers();
            List<UserDto> usersDto = _mapper.Map<List<UserDto>>(users);
            return Ok(usersDto);
        }

        [HttpPost("/users")]
        public async Task<ActionResult<UserDto>> AddUser()
        {
            var user = await _userRepository.AddUser();
            return Ok(user);
        }

        [HttpGet("/users/todos")]
        public async Task<ActionResult<List<TodoDto>>> GetUserTodos(int id)
        {
            var todos = await _userRepository.GetUserTodos(id);
            var todosDto = _mapper.Map<List<TodoDto>>(todos);
            return Ok(todosDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo(int id, User user)
        {
            var todo = await _userRepository.GetTodo(id, user);
            if (todo == null) { return NotFound(); }

            var todoDto = _mapper.Map<TodoDto>(todo);

            return Ok(todoDto);
        }

        [HttpPost]
        public async Task<ActionResult<TodoDto>> PostTodo(Todo todo)
        {
            var createdTodo = await _userRepository.AddTodo(todo);
            return CreatedAtAction("GetTodo", new { id = createdTodo.Id }, value: createdTodo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Todo>> PutTodo(int id, User user)
        {
            var updatedTodo = await _userRepository.UpdateTodo(id, user);

            if (updatedTodo == null) { return BadRequest(); }

            var todoDto = _mapper.Map<TodoDto>(updatedTodo);
            return Ok(todoDto);
        }

        [HttpDelete(template: "{id}")]
        public async Task<IActionResult> DeleteTodo(int id, User user)
        {
            try
            {
                var todo = await _userRepository.DeleteTodo(id, user);

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
