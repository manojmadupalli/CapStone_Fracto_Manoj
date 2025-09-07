using System.ComponentModel.DataAnnotations;
namespace FractoBackend.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int Score { get; set; }
        public string Review { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
