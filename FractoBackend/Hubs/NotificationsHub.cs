using Microsoft.AspNetCore.SignalR;
namespace FractoBackend.Hubs
{
    public class NotificationsHub : Hub
    {
        public async Task SendAppointmentConfirmation(string userId, string message)
        {
            await Clients.User(userId).SendAsync("AppointmentConfirmed", message);
        }
    }
}
