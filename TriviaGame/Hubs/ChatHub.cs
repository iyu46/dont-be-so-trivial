using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace TriviaGame.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendToAll(string name, string message)
        {
            await Clients.All.SendAsync("sendToAll", name, message);
        }

        public async Task JoinRoom(string name, string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("chatJoinRoom", $"{name} has joined the room.");
            await Clients.Group(roomName).SendAsync("joinRoom", name, roomName);

        }

        public async Task LeaveRoom(string name, string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("Send", $"{name} has left the room.");
        }
    }
}