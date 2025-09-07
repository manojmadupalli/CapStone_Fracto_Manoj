using System.ComponentModel.DataAnnotations;

public class CreateDoctorDto
{
    [Required] public string Name { get; set; }
    [Required] public int SpecializationId { get; set; }
    [Required] public string City { get; set; }
    public decimal Rating { get; set; } = 0;
    public string? ProfileImagePath { get; set; } = "uploads/doctors/default.png";
}
