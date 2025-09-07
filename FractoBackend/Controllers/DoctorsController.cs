using Microsoft.AspNetCore.Mvc;
using FractoBackend.Data;
using FractoBackend.Models;
using FractoBackend.Dtos;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace FractoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DoctorsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/doctors
        [HttpGet]
        public IActionResult GetAll()
        {
            var doctors = _db.Doctors.ToList();
            return Ok(doctors);
        }

        // GET: api/doctors/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var doctor = _db.Doctors.FirstOrDefault(d => d.DoctorId == id);
            if (doctor == null)
                return NotFound();
            return Ok(doctor);
        }

        // POST: api/doctors
        // [HttpPost]
        // public IActionResult Add([FromBody] Doctor doctor)
        // {
        //     if (doctor == null)
        //         return BadRequest();

        //     _db.Doctors.Add(doctor);
        //     _db.SaveChanges();
        //     return CreatedAtAction(nameof(GetById), new { id = doctor.DoctorId }, doctor);
        // }
        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] CreateDoctorDto dto)
        {
            var doctor = new Doctor
            {
                Name = dto.Name,
                SpecializationId = dto.SpecializationId,
                City = dto.City,
                Rating = dto.Rating,
                ProfileImagePath = dto.ProfileImagePath,
                CreatedAt = DateTime.UtcNow
            };

            _db.Doctors.Add(doctor);
            await _db.SaveChangesAsync();

            return Ok(doctor);
        }



        // PUT: api/doctors/{id}
        // [HttpPut("{id}")]
        // public IActionResult Update(int id, [FromBody] Doctor doctor)
        // {
        //     var existing = _db.Doctors.FirstOrDefault(d => d.DoctorId == id);
        //     if (existing == null)
        //         return NotFound();

        //     existing.Name = doctor.Name;
        //     existing.City = doctor.City;
        //     existing.SpecializationId = doctor.SpecializationId;
        //     existing.Rating = doctor.Rating;
        //     existing.ProfileImagePath = doctor.ProfileImagePath;
        //     _db.SaveChanges();
        //     return NoContent();
        // }

        [HttpPut("{id}")]
        public IActionResult UpdateDoctor(int id, [FromBody] DoctorUpdateDto dto)
        {
            var doctor = _db.Doctors.FirstOrDefault(d => d.DoctorId == id);
            if (doctor == null)
                return NotFound();

            // Validate specialization exists
            if (!_db.Specializations.Any(s => s.SpecializationId == dto.SpecializationId))
                return BadRequest("Specialization does not exist.");

            // Update fields
            doctor.Name = dto.Name;
            doctor.SpecializationId = dto.SpecializationId;
            doctor.City = dto.City;
            doctor.Rating = dto.Rating;
            doctor.ProfileImagePath = dto.ProfileImagePath;

            _db.SaveChanges();
            return NoContent();
        }

        // Search





        // DELETE: api/doctors/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _db.Doctors.FirstOrDefault(d => d.DoctorId == id);
            if (existing == null)
                return NotFound();

            _db.Doctors.Remove(existing);
            _db.SaveChanges();
            return NoContent();
        }


        /// GET /api/doctors/{id}/timeslots?date=2025-09-10
        /// Returns available timeslots (strings like "09:00", "09:30", "10:00")
        /// </summary>
        [HttpGet("{id}/timeslots")]
        public async Task<IActionResult> GetTimeSlots(int id, [FromQuery] string? date)
        {
            var doctor = await _db.Doctors.FindAsync(id);
            if (doctor == null) return NotFound();

            DateOnly targetDate;
            if (string.IsNullOrWhiteSpace(date))
            {
                targetDate = DateOnly.FromDateTime(DateTime.UtcNow.Date);
            }
            else
            {
                if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out targetDate))
                {
                    // fallback try parse
                    if (!DateOnly.TryParse(date, out targetDate))
                        return BadRequest("Invalid date format. Use yyyy-MM-dd");
                }
            }

            // Configuration - you can move these to appsettings later
            var clinicStart = new TimeOnly(9, 0);   // 09:00
            var clinicEnd = new TimeOnly(17, 0);    // 17:00
            var slotMinutes = 30;

            // fetch appointments for this doctor on that date
            var dayStart = targetDate.ToDateTime(new TimeOnly(0, 0), DateTimeKind.Utc);
            var dayEnd = targetDate.ToDateTime(new TimeOnly(23, 59), DateTimeKind.Utc);

            var bookedSlots = await _db.Appointments
                .Where(a => a.DoctorId == id && a.AppointmentDate.Date == targetDate.ToDateTime(new TimeOnly(0, 0)).Date)
                .Select(a => a.TimeSlot)
                .ToListAsync();

            // Build slot list
            var slots = new List<string>();
            var current = clinicStart;
            while (current < clinicEnd)
            {
                // format as "HH:mm"
                var slotText = current.ToString("hh\\:mm");
                // adapt formatting: TimeOnly.ToString defaults different; produce "09:00"
                slotText = current.ToString("HH:mm");
                if (!bookedSlots.Contains(slotText))
                {
                    slots.Add(slotText);
                }
                current = current.AddMinutes(slotMinutes);
            }

            return Ok(new { date = targetDate.ToString("yyyy-MM-dd"), slots });


        }
    }
}
