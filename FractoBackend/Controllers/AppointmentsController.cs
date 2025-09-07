// using Microsoft.AspNetCore.Mvc;
// using FractoBackend.Data;
// using FractoBackend.Models;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Authorization;
// using FractoBackend.DTOs;

// namespace FractoBackend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class AppointmentController : ControllerBase
//     {
//         private readonly AppDbContext _db;
//         public AppointmentController(AppDbContext db) { _db = db; }

//         private List<string> GenerateDefaultSlots()
//         {
//             var slots = new List<string>();
//             var start = new TimeSpan(9, 0, 0);
//             var end = new TimeSpan(17, 0, 0);
//             var cur = start;
//             while (cur < end)
//             {
//                 var next = cur.Add(new TimeSpan(0,30,0));
//                 slots.Add($"{cur:hh\\:mm}-{next:hh\\:mm}");
//                 cur = next;
//             }
//             return slots;
//         }

//         [HttpGet("timeslots/{doctorId}/{date}")]
//         public async Task<IActionResult> GetTimeSlots(int doctorId, DateTime date)
//         {
//             var all = GenerateDefaultSlots();
//             var booked = await _db.Appointments.Where(a => a.DoctorId == doctorId && a.AppointmentDate == date.Date && a.Status == "Booked").Select(a => a.TimeSlot).ToListAsync();
//             var available = all.Except(booked);
//             return Ok(available);
//         }

//         [HttpGet("my/{userId}")]
//         public async Task<IActionResult> MyAppointments(int userId)
//         {
//             var list = await _db.Appointments.Include(a => a.Doctor).Where(a => a.UserId == userId).ToListAsync();
//             return Ok(list);
//         }

//         [HttpPost("book")]
//         [Authorize]
//         public async Task<IActionResult> Book(BookDto dto)
//         {
//             var exists = await _db.Appointments.AnyAsync(a => a.DoctorId==dto.DoctorId && a.AppointmentDate==dto.AppointmentDate.Date && a.TimeSlot==dto.TimeSlot && a.Status=="Booked");
//             if (exists) return Conflict("Slot already booked");
//             var appt = new Appointment { DoctorId = dto.DoctorId, UserId = dto.UserId, AppointmentDate = dto.AppointmentDate.Date, TimeSlot = dto.TimeSlot, Status = "Booked" };
//             _db.Appointments.Add(appt);
//             await _db.SaveChangesAsync();
//             return Ok(appt);
//         }

//         [HttpPost("cancel/{id}")]
//         [Authorize]
//         public async Task<IActionResult> Cancel(int id)
//         {
//             var appt = await _db.Appointments.FindAsync(id);
//             if (appt == null) return NotFound();
//             appt.Status = "Cancelled";
//             await _db.SaveChangesAsync();
//             return Ok();
//         }
//     }
// }

// using FractoBackend.Data;
// using FractoBackend.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace FractoBackend.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class AppointmentsController : ControllerBase
//     {
//         private readonly AppDbContext _db;

//         public AppointmentsController(AppDbContext db)
//         {
//             _db = db;
//         }

//         // GET: api/appointments
//         [HttpGet]
//         public ActionResult<IEnumerable<Appointment>> GetAll()
//         {
//             var appointments = _db.Appointments
//                                   .Include(a => a.User)
//                                   .Include(a => a.Doctor)
//                                   .ToList();
//             return Ok(appointments);
//         }

//         // GET: api/appointments/5
//         [HttpGet("{id}")]
//         public ActionResult<Appointment> GetById(int id)
//         {
//             var appointment = _db.Appointments
//                                  .Include(a => a.User)
//                                  .Include(a => a.Doctor)
//                                  .FirstOrDefault(a => a.AppointmentId == id);

//             if (appointment == null)
//                 return NotFound();

//             return Ok(appointment);
//         }

//         // POST: api/appointments
//         [HttpPost]
//         public ActionResult<Appointment> Create([FromBody] Appointment appointment)
//         {
//             if (!ModelState.IsValid)
//                 return BadRequest(ModelState);

//             _db.Appointments.Add(appointment);
//             _db.SaveChanges();

//             return CreatedAtAction(nameof(GetById), new { id = appointment.AppointmentId }, appointment);
//         }

//         // PUT: api/appointments/5
//         [HttpPut("{id}")]
//         public IActionResult Update(int id, [FromBody] Appointment updatedAppointment)
//         {
//             if (id != updatedAppointment.AppointmentId)
//                 return BadRequest();

//             var appointment = _db.Appointments.Find(id);
//             if (appointment == null)
//                 return NotFound();

//             appointment.UserId = updatedAppointment.UserId;
//             appointment.DoctorId = updatedAppointment.DoctorId;
//             appointment.AppointmentDate = updatedAppointment.AppointmentDate;
//             appointment.TimeSlot = updatedAppointment.TimeSlot;
//             appointment.Status = updatedAppointment.Status;

//             _db.SaveChanges();
//             return NoContent();
//         }


//         // DELETE: api/appointments/5
//         [HttpDelete("{id}")]
//         public IActionResult Delete(int id)
//         {
//             var appointment = _db.Appointments.Find(id);
//             if (appointment == null)
//                 return NotFound();

//             _db.Appointments.Remove(appointment);
//             _db.SaveChanges();
//             return NoContent();
//         }
//     }
// }



using FractoBackend.Data;
using FractoBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FractoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AppointmentsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/appointments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _db.Appointments
                .Include(a => a.User)
                .Include(a => a.Doctor)
                .ToListAsync();

            return Ok(appointments);
        }

        // GET: api/appointments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _db.Appointments
                .Include(a => a.User)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.AppointmentId == id);

            if (appointment == null)
                return NotFound();

            return Ok(appointment);
        }

        // POST: api/appointments
        [HttpPost]
        // public async Task<IActionResult> BookAppointment([FromBody] Appointment appointment)
        // {
        //     if (!ModelState.IsValid) return BadRequest(ModelState);

        //     // Only IDs are needed, EF will resolve navigation
        //     var userExists = await _db.Users.AnyAsync(u => u.UserId == appointment.UserId);
        //     var doctorExists = await _db.Doctors.AnyAsync(d => d.DoctorId == appointment.DoctorId);

        //     if (!userExists || !doctorExists) return NotFound();

        //     _db.Appointments.Add(appointment);
        //     await _db.SaveChangesAsync();
        //     return Ok(appointment);
        // }
        [HttpPost]
        public async Task<IActionResult> BookAppointment([FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Get UserId from JWT
            var userIdClaim = User.FindFirst("userid");
            if (userIdClaim == null) return Unauthorized();

            appointment.UserId = int.Parse(userIdClaim.Value);

            // Validate doctor exists
            var doctorExists = await _db.Doctors.AnyAsync(d => d.DoctorId == appointment.DoctorId);
            if (!doctorExists) return NotFound("Doctor not found");

            // Default status
            appointment.Status ??= "Pending";

            _db.Appointments.Add(appointment);
            await _db.SaveChangesAsync();

            return Ok(appointment);
        }


        // PUT: api/appointments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Appointment dto)
        {
            if (id != dto.AppointmentId)
                return BadRequest();

            var appointment = await _db.Appointments.FindAsync(id);
            if (appointment == null)
                return NotFound();

            // Update allowed fields
            appointment.AppointmentDate = dto.AppointmentDate;
            appointment.TimeSlot = dto.TimeSlot;
            appointment.Status = dto.Status ?? appointment.Status;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/appointments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var appointment = await _db.Appointments.FindAsync(id);
            if (appointment == null)
                return NotFound();

            _db.Appointments.Remove(appointment);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        

        public class AppointmentStatusDto
{
    public string Status { get; set; } = "Pending";
}

[HttpPatch("{id}/status")]
public async Task<IActionResult> UpdateStatus(int id, [FromBody] AppointmentStatusDto dto)
{
    var appt = await _db.Appointments.FindAsync(id);
    if (appt == null) return NotFound();

    appt.Status = dto.Status;
    await _db.SaveChangesAsync();
    return Ok(appt);
}

    }
}
