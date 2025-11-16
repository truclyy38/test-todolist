using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly ILogger<TodosController> _logger;

    public TodosController(TodoContext context, ILogger<TodosController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/todos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        try
        {
            var todos = await _context.Todos
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
            
            return Ok(todos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching todos");
            return StatusCode(500, "Error fetching todos");
        }
    }

    // GET: api/todos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(int id)
    {
        try
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching todo {TodoId}", id);
            return StatusCode(500, "Error fetching todo");
        }
    }

    // POST: api/todos
    [HttpPost]
    public async Task<ActionResult<Todo>> CreateTodo(CreateTodoDto createTodoDto)
    {
        try
        {
            var todo = new Todo
            {
                Title = createTodoDto.Title,
                Description = createTodoDto.Description,
                Status = createTodoDto.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating todo");
            return StatusCode(500, "Error creating todo");
        }
    }
}
