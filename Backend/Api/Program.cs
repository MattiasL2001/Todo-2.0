global using Api.Data;
using Api.Repositories;
using Api.Helpers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Database Connection String
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<TodoContext>(opt =>
//{
//    opt.UseSqlite(connectionString);
//});

builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddDbContext<TodoContext>(options =>
{
    options.UseSqlite("Data Source=todoDb.db");
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
