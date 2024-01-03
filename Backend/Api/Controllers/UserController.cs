using Api.Dtos;
using Api.Models;
using Api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;
        private int passwordMinimumLength = 5;

        public UserController(IUserRepository userRepository, IMapper mapper, ILogger<UserController> logger)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("/usersGetUsers")]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            List<User> users = await _userRepository.GetUsers();
            users.ForEach(user =>
            {
                Console.WriteLine(user.UserName);

                if (user.Todos.Count > 0)
                {
                    foreach (var todo in user.Todos)
                    {
                        Console.WriteLine(todo + "!!!!");
                    }
                }
                else { Console.WriteLine("no todos"); }
            });
            List<UserDto> usersDto = _mapper.Map<List<UserDto>>(users);
            return Ok(usersDto);
        }

        [HttpPost("/users/AddUser")]
        public async Task<ActionResult<UserDto>> AddUser(string userName, string password)
        {
            if (await _userRepository.IsUserNameTaken(userName)) { return Conflict("Username already exists!"); }
            if (password.Length < passwordMinimumLength) { return Conflict("Password need to include at minimum 5 characters!"); }

            var userObj = await _userRepository.AddUser(userName, password);
            return Ok(userObj);
        }

        [HttpGet("/users/GetUserTodos")]
        public async Task<ActionResult<List<TodoDto>>> GetUserTodos(int id)
        {
            List<Todo> todos = await _userRepository.GetUserTodos(id);
            List<TodoDto> todosDto = _mapper.Map<List<TodoDto>>(todos);
            return Ok(todosDto);
        }

        [HttpGet("/users/GetUserTodo")]
        public async Task<ActionResult<TodoDto>> GetTodo(int userId, int todoId)
        {
            Todo todo = await _userRepository.GetTodo(userId, todoId);
            if (todo == null) { return null; }
            return Ok(todo);
        }

        [HttpPost("/users/PostTodo")]
        public async Task<ActionResult<TodoDto>> PostTodo(Todo todo, int id)
        {
            var createdTodo = await _userRepository.AddTodo(todo, id);
            return Ok(createdTodo);
        }

        [HttpPut("/users/PutTodo")]
        public async Task<ActionResult<Todo>> PutTodo(int userId, int todoId, Todo todo)
        {
            var updatedTodo = await _userRepository.UpdateTodo(userId, todoId, todo);

            if (updatedTodo == null) { return BadRequest(); }

            var todoDto = _mapper.Map<TodoDto>(updatedTodo);
            return Ok(todoDto);
        }

        [HttpDelete("/users/DeleteTodo")]
        public async Task<IActionResult> DeleteTodo(int userId, int todoId)
        {
            var todo = await _userRepository.DeleteTodo(userId, todoId);
            if (todo == null) { return  NotFound(); }
            return Ok(todo);
        }

        [HttpDelete("/users/DeleteUser")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            User user = await _userRepository.DeleteUser(userId);
            if (user == null) { return NotFound(); };
            return Ok(user);
        }
    }
}
