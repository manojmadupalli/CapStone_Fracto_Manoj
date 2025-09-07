using System.ComponentModel.DataAnnotations;
namespace FractoBackend.Models
{
    public class Specialization
    {
        public int SpecializationId { get; set; }
        [Required] public string SpecializationName { get; set; }
    }
}
