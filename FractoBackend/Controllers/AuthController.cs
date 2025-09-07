using Microsoft.AspNetCore.Mvc;
using FractoBackend.Data;
using FractoBackend.Models;
using FractoBackend.Services;
using Microsoft.EntityFrameworkCore;
using FractoBackend.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FractoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ITokenService _tokens;
        public AuthController(AppDbContext db, ITokenService tokens) { _db = db; _tokens = tokens; }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _db.Users.AnyAsync(u => u.Username == dto.Username || u.Email == dto.Email))
                return BadRequest("User exists");

            // var user = new User
            // {
            //     Username = dto.Username,
            //     Email = dto.Email,
            //     PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            //     Role = dto.Role ?? "User",
            //     FullName = dto.FullName,
            //     City = dto.City
            // };
            var user = new User
{
    Username = dto.Username,
    FullName = dto.FullName,
    Email = dto.Email,
    City = dto.City,
    Role = dto.Role,
    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
    ProfileImagePath = "uploads/profiles/default.png",
    CreatedAt = DateTime.UtcNow
};

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { user.UserId });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == dto.Username || u.Email == dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)) return Unauthorized();
            var token = _tokens.CreateToken(user);
            return Ok(new { token, user = new { user.UserId, user.Username, user.Email, user.Role } });
        }

        [Authorize]
        [HttpPost("upload-profile/{userId}")]
        public async Task<IActionResult> UploadProfile(int userId, IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("No file");
            var ext = Path.GetExtension(file.FileName);
            var filename = $"{Guid.NewGuid()}{ext}";
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "profiles");
            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);
            var fullPath = Path.Combine(uploadPath, filename);
            using (var stream = System.IO.File.Create(fullPath)) await file.CopyToAsync(stream);
            var user = await _db.Users.FindAsync(userId);
            if (user == null) return NotFound();
            user.ProfileImagePath = $"/uploads/profiles/{filename}";
            await _db.SaveChangesAsync();
            return Ok(new { path = user.ProfileImagePath });
        }
    }
}
