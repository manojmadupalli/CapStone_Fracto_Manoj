using Microsoft.AspNetCore.Mvc;
using FractoBackend.Data;
using FractoBackend.Models;

namespace FractoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public SpecializationsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/specializations
        [HttpGet]
        public IActionResult GetAll()
        {
            var specializations = _db.Specializations.ToList();
            return Ok(specializations);
        }

        // GET: api/specializations/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var specialization = _db.Specializations.FirstOrDefault(s => s.SpecializationId == id);
            if (specialization == null)
                return NotFound();
            return Ok(specialization);
        }

        // POST: api/specializations
        [HttpPost]
        public IActionResult Add([FromBody] Specialization specialization)
        {
            if (specialization == null || string.IsNullOrEmpty(specialization.SpecializationName))
                return BadRequest("Specialization name is required.");

            _db.Specializations.Add(specialization);
            _db.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = specialization.SpecializationId }, specialization);
        }

        // PUT: api/specializations/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Specialization specialization)
        {
            var existing = _db.Specializations.FirstOrDefault(s => s.SpecializationId == id);
            if (existing == null)
                return NotFound();

            existing.SpecializationName = specialization.SpecializationName;
            _db.SaveChanges();
            return NoContent();
        }

        // DELETE: api/specializations/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _db.Specializations.FirstOrDefault(s => s.SpecializationId == id);
            if (existing == null)
                return NotFound();

            _db.Specializations.Remove(existing);
            _db.SaveChanges();
            return NoContent();
        }
    }
}
