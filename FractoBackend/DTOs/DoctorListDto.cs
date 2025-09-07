namespace FractoBackend.Dtos
{
    public class DoctorListDto
    {
        public int DoctorId { get; set; }
        public string Name { get; set; } = "";
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; } = "";
        public string City { get; set; } = "";
        public decimal Rating { get; set; }
        public string? ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
