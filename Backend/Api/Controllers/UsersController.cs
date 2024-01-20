﻿using Api.Dtos;
using Api.Models;
using Api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticate _authenticate;
        private readonly IMapper _mapper;
        private readonly ILogger<UsersController> _logger;
        private int passwordMinimumLength = 5;

        public UsersController(IUserRepository userRepository, IAuthenticate authenticate,
            IMapper mapper, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _authenticate = authenticate;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("/users/GetUsers")]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            List<User> users = await _userRepository.GetUsers();
            users.ForEach(user =>
            {
                Console.WriteLine(user.UserName);
            });
            List<UserDto> usersDto = _mapper.Map<List<UserDto>>(users);
            return Ok(usersDto);
        }

        [HttpGet("/users/{username}")]
        public async Task<ActionResult<UserDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUser(username);
            if (user == null) { return BadRequest("Could not find user: " + username); }
            return Ok(user);
        }

        [HttpPut("/users/{username}/changepassword")]
        public async Task<IActionResult> ChangePassword(UserAuthenticationDto userDto, string newPassword)
        {
            var user = await _authenticate.ValidateCredentials(userDto.UserName, userDto.Password);

            if (user == null)
            {
                return Unauthorized("Could not find a user with matching credentials");
            }

            if (newPassword.Length < passwordMinimumLength)
            {
                Console.WriteLine("Bad password!");
                return Conflict("Password needs to include at minimum 5 characters!");
            }

            var newPasswordHash = _authenticate.HashPassword(newPassword);
            await _userRepository.ChangeUserPassword(userDto.UserName, newPasswordHash);
            return Ok("Password changed successfully");
        }

        [HttpGet("/users/{username}/GetTodos")]
        public async Task<ActionResult<List<TodoDto>>> GetUserTodos(int id)
        {
            List<Todo> todos = await _userRepository.GetUserTodos(id);
            List<TodoDto> todosDto = _mapper.Map<List<TodoDto>>(todos);
            return Ok(todosDto);
        }

        [HttpGet("/users/{username}/GetTodo")]
        public async Task<ActionResult<TodoDto>> GetTodo(int userId, int todoId)
        {
            Todo todo = await _userRepository.GetTodo(userId, todoId);
            if (todo == null) { return null; }
            return Ok(todo);
        }

        [HttpPost("/users/{username}/PostTodo")]
        public async Task<ActionResult<TodoDto>> PostTodo(bool completed, string title, int userId)
        {
            var todo = new Todo
            {
                Completed = completed,
                Title = title,
            };
            var user = await _userRepository.GetUser(userId);
            if (user == null) { return  NotFound("User not found!"); }
            var createdTodo = await _userRepository.AddTodo(todo, userId);
            return Ok(createdTodo);
        }

        [HttpPut("/users/{username}/PutTodo")]
        public async Task<ActionResult<Todo>> PutTodo(bool completed, string title, int todoId, int userId)
        {
            var updatedTodo = await _userRepository.UpdateTodo(userId, todoId, completed, title);

            if (updatedTodo == null) { return BadRequest(); }

            var todoDto = _mapper.Map<TodoDto>(updatedTodo);
            return Ok(todoDto);
        }

        [HttpDelete("/users/{username}/DeleteTodo")]
        public async Task<IActionResult> DeleteTodo(int userId, int todoId)
        {
            var todo = await _userRepository.DeleteTodo(userId, todoId);
            if (todo == null) { return  NotFound(); }
            return Ok(todo);
        }
    }
}
