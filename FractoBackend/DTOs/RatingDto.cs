namespace FractoBackend.Dtos
{
    public class RatingDto
    {
        public int DoctorId { get; set; }
        public int UserId { get; set; }   // ideally server derives this from JWT; but keep in DTO for now
        public int Rating { get; set; }   // 1..5
        public string? Comment { get; set; }
    }
}
