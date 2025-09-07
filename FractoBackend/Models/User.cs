using System.ComponentModel.DataAnnotations;

namespace FractoBackend.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string PasswordHash { get; set; }
        public string Role { get; set; } = "User";
        public string FullName { get; set; }
        public string City { get; set; }
        public string ? ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
