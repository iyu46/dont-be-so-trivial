using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System;
using TriviaGame.Models;
using TriviaGame.Models.DTOs;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace TriviaGame.Hubs
{
    public class GameHub : Hub
    {

        private IServiceProvider _sp;
        public GameHub(IServiceProvider sp)
        {
            _sp = sp;
        }

        public async Task SendToRoom(string name, string message, string roomName)
        {
            await Clients.Group(roomName).SendAsync("sendToRoom", name, message);
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

        public async Task StartGame(string roomName)
        {
            await Clients.OthersInGroup(roomName).SendAsync("startGame");
        }

        public async Task UserReady(string roomName)
        {
            await Clients.Group(roomName).SendAsync("userReady");
        }

        public async Task GetQuickstarter(string roomName, string category, string difficulty)
        {
            using (var scope = _sp.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<TriviaDbContext>();

                var questions = new List<QuickstarterDTO>();

                var numQuestions = 4;

                // for now assume category and difficulty are always sent ffs
                // fetch list of possible questions, randomly generate numbers and pull elements from list
                //var dataSet = dbContext.QuickstarterQuestions.Where(r => (r.Category == category && r.Difficulty == difficulty)).ToList();
                var categories = JsonConvert.DeserializeObject<List<string>>(category);

                for (int i = 0; i < numQuestions; i++)
                {
                    var dataSet = dbContext.QuickstarterQuestions.Where(r => (r.Category == categories[i] && r.Difficulty == difficulty)).ToList();
                    Random rand = new Random();
                    int randValue = rand.Next(0, dataSet.Count);

                    QuickstarterQuestion question = dataSet.Skip(randValue).Take(1).First();
                    dataSet.RemoveAt(randValue);
                    questions.Add(new QuickstarterDTO()
                    {
                        Id = question.Id,
                        Category = question.Category,
                        Difficulty = question.Difficulty,
                        Question = question.Question,
                        Answers = JsonConvert.DeserializeObject<List<string>>(question.Answers)
                    });
                }
                var session = dbContext.Sessions.FirstOrDefault(r => r.Id == roomName);
                if (session == null)
                {
                    return;
                }
                session.CurrentQuestions = JsonConvert.SerializeObject(questions);
                dbContext.SaveChanges();

                await Clients.Group(roomName).SendAsync("getQuickstarter", questions);
            }
        }
    }
}