using System;
using Microsoft.AspNetCore.Identity;
using Api.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Api.Repositories
{
    public class AuthenticationService : IAuthenticate
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<Task<User>> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly UserContext _context;

        public AuthenticationService(IPasswordHasher<User> passwordHasher, IConfiguration configuration,
            SignInManager<Task<User>> signInManager, UserManager<User> userManager)
        {
            _passwordHasher = passwordHasher;
            _configuration = configuration;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> Register(string username, string password)
        {
            var findExistingUserWithName = await _userManager.FindByNameAsync(username);

            if (findExistingUserWithName != null) { }

            if (findExistingUserWithName == null)
            {
                var user = new User { UserName = username };
                var result = await _userManager.CreateAsync(user, password);

                return result.Succeeded;
            }

            return false;
        }

        public async Task<string> Login(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return null; // User not found or invalid credentials
            }

            var result = await _signInManager.PasswordSignInAsync(user.UserName, password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var token = GenerateJwtToken(user);
                return token;
            }

            return null;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // Set token expiration
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
