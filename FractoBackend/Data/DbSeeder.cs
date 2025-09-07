using System;
using System.Collections.Generic;
using System.Linq;
using FractoBackend.Models;

namespace FractoBackend.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db)
        {
            // 1️⃣ Seed Specializations
            if (!db.Specializations.Any())
            {
                var specializations = new List<Specialization>
                {
                    new Specialization { SpecializationName = "Cardiology" },
                    new Specialization { SpecializationName = "Dermatology" },
                    new Specialization { SpecializationName = "Neurology" },
                    new Specialization { SpecializationName = "Pediatrics" },
                    new Specialization { SpecializationName = "Orthopedics" }
                };

                db.Specializations.AddRange(specializations);
                db.SaveChanges();
            }

            // 2️⃣ Seed Doctors
            if (!db.Doctors.Any())
            {
                var cardiology = db.Specializations.FirstOrDefault(s => s.SpecializationName == "Cardiology");
                var dermatology = db.Specializations.FirstOrDefault(s => s.SpecializationName == "Dermatology");
                var neurology = db.Specializations.FirstOrDefault(s => s.SpecializationName == "Neurology");

                if (cardiology != null && dermatology != null && neurology != null)
                {
                    db.Doctors.AddRange(
                        new Doctor
                        {
                            Name = "Dr. Smith",
                            City = "New York",
                            SpecializationId = cardiology.SpecializationId,
                            Rating = 4.8M,
                            ProfileImagePath = "uploads/doctors/default.png",
                            CreatedAt = DateTime.UtcNow
                        },
                        new Doctor
                        {
                            Name = "Dr. Jane",
                            City = "Boston",
                            SpecializationId = dermatology.SpecializationId,
                            Rating = 4.5M,
                            ProfileImagePath = "uploads/doctors/default.png",
                            CreatedAt = DateTime.UtcNow
                        },
                        new Doctor
                        {
                            Name = "Dr. Alex",
                            City = "Chicago",
                            SpecializationId = neurology.SpecializationId,
                            Rating = 4.6M,
                            ProfileImagePath = "uploads/doctors/default.png",
                            CreatedAt = DateTime.UtcNow
                        }
                    );
                    db.SaveChanges();
                }
            }

            // 3️⃣ Seed Users
            if (!db.Users.Any())
            {
                db.Users.AddRange(
                    new User
                    {
                        Username = "admin",
                        FullName = "System Administrator",
                        Email = "admin@fracto.com",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                        Role = "Admin",
                        City = "New York",
                        ProfileImagePath = "uploads/profiles/default.png",
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        Username = "john_doe",
                        FullName = "John Doe",
                        Email = "john@example.com",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                        Role = "User",
                        City = "Los Angeles",
                        ProfileImagePath = "uploads/profiles/default.png",
                        CreatedAt = DateTime.UtcNow
                    }
                );
                db.SaveChanges();
            }


            if (!db.Appointments.Any())
{
    var user = db.Users.First();
    var doctor = db.Doctors.First();

    db.Appointments.Add(new Appointment
    {
        UserId = user.UserId,
        DoctorId = doctor.DoctorId,
        AppointmentDate = DateTime.UtcNow.AddDays(1),
        TimeSlot = "10:00 AM - 10:30 AM",
        Status = "Pending"
    });

    db.SaveChanges();
}

        }
    }
}
