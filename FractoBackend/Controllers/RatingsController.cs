using FractoBackend.Data;
using FractoBackend.Dtos;
using FractoBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FractoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public RatingsController(AppDbContext db) => _db = db;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RatingDto dto)
        {
            if (dto.Rating < 1 || dto.Rating > 5) return BadRequest("Rating must be between 1 and 5");

            var user = await _db.Users.FindAsync(dto.UserId);
            if (user == null) return NotFound("User not found");

            var doctor = await _db.Doctors.FindAsync(dto.DoctorId);
            if (doctor == null) return NotFound("Doctor not found");

            var rating = new Rating
            {
                DoctorId = dto.DoctorId,
                UserId = dto.UserId,
                RatingId = (byte)dto.Rating,
               // Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _db.Ratings.Add(rating);
            await _db.SaveChangesAsync();

            // Recalculate doctor's average rating
            var avg = await _db.Ratings
                .Where(r => r.DoctorId == dto.DoctorId)
                .AverageAsync(r => (decimal)r.RatingId);

            doctor.Rating = Math.Round(avg, 2);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Rating saved", doctorId = dto.DoctorId, rating = doctor.Rating });
        }

        [HttpGet("doctor/{doctorId}")]
        public async Task<IActionResult> GetForDoctor(int doctorId)
        {
            var ratings = await _db.Ratings
                .Where(r => r.DoctorId == doctorId)
                .Select(r => new { r.RatingId, r.UserId, r.CreatedAt })
                .ToListAsync();

            return Ok(ratings);
        }
    }
}
