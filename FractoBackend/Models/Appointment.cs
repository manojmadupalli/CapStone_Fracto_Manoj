// using System.ComponentModel.DataAnnotations;
// namespace FractoBackend.Models
// {
//     public class Appointment
//     {
//         public int AppointmentId { get; set; }
//         public int UserId { get; set; }
//         public User User { get; set; }
//         public int DoctorId { get; set; }
//         public Doctor Doctor { get; set; }
//         public DateTime AppointmentDate { get; set; }
//         public string TimeSlot { get; set; }
//         public string Status { get; set; } = "Booked";
//         public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
//     }
// }

// using System.ComponentModel.DataAnnotations;

// namespace FractoBackend.Models
// {
//     public class Appointment
//     {
//         public int AppointmentId { get; set; }

//         [Required]
//         public int UserId { get; set; }
//         public User User { get; set; }

//         [Required]
//         public int DoctorId { get; set; }
//         public Doctor Doctor { get; set; }

//         [Required]
//         public DateTime AppointmentDate { get; set; }

//         [Required]
//         [StringLength(20)]
//         public string TimeSlot { get; set; }  // e.g., "10:00 AM - 10:30 AM"

//         [Required]
//         [StringLength(20)]
//         public string Status { get; set; } = "Pending"; // Pending, Confirmed, Completed, Cancelled
//     }
// }


using System.ComponentModel.DataAnnotations;

namespace FractoBackend.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        [Required]
        public int UserId { get; set; }
        public User ? User { get; set; }
        [Required]
        public int DoctorId { get; set; }
        public Doctor ? Doctor { get; set; }
        [Required]
        public DateTime AppointmentDate { get; set; }
        [Required]
        public string TimeSlot { get; set; }
        [Required]
        public string Status { get; set; } = "Pending";
    }
}