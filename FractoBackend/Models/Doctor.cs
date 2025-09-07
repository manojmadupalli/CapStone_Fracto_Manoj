// using System.ComponentModel.DataAnnotations;
// namespace FractoBackend.Models
// {
//     public class Doctor
//     {
//         public int DoctorId { get; set; }
//         [Required] public string Name { get; set; }
//         public int SpecializationId { get; set; }
//         public Specialization Specialization { get; set; }
//         public string City { get; set; }
//         public decimal Rating { get; set; } = 0;
//         public string ? ProfileImagePath { get; set; }
//         public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
//     }
// }


using System.ComponentModel.DataAnnotations;

namespace FractoBackend.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required] // keep this for database foreign key
        public int SpecializationId { get; set; }

        // Remove [Required] from navigation property
        public Specialization? Specialization { get; set; }

        [Required]
        public string City { get; set; }

        public decimal Rating { get; set; } = 0;

        public string? ProfileImagePath { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
