using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TriviaGame.Models;
using TriviaGame.Models.DTOs;

namespace TriviaGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Route("[controller]/[action]")]
    public class SessionController : ControllerBase
    {
        private readonly TriviaDbContext context;

        public SessionController(TriviaDbContext context)
        {
            this.context = context;
        }

        [HttpGet("Generate")]
        public string Generate()
        {
            var newSessionId = GenerateSessionId();
            var newSession = new Session() { Id = newSessionId, Users = null, GamePhase = -1 };
            this.context.Sessions.Add(newSession);
            this.context.SaveChanges();
            return newSessionId;
        }

        [HttpGet("Get/{id}")]
        public IEnumerable<UserDTO> Get(string id)
        {
            var dataSet = this.context.Users.Where(x => x.SessionId == id).Select(x =>
                new UserDTO
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToList();
            return dataSet;
        }

        [HttpPost("Join")]
        public IActionResult Join(User user) 
        {
            var existingSession = this.context.Sessions.Include(r => r.Users).FirstOrDefault(r => r.Id == user.SessionId);
            if (existingSession == null)
            {
                // TODO: throw an exception here and remove result nonsense
                return NotFound("Session does not exist");
            }
            if (existingSession.Users.Count == 4)
            {
                // TODO: throw an exception here because room is full
                return StatusCode(409, "This game room is already full");
            }
            if (existingSession.GamePhase > -1)
            {
                // TODO: figure out what logic to do if the game is already underway and not in the lobby
                return StatusCode(409, "This game is already in progress");
            }
            existingSession.Users.Add(user);
            this.context.SaveChanges();
            return Ok(existingSession.Users.ToList());
        }

        private string GenerateSessionId()
        {
            // creating a StringBuilder object()
            StringBuilder sessionId = new StringBuilder();
            Random random = new Random();

            int length = 4;
            char letter;

            do
            {
                if (sessionId.Length == 4)
                {
                    sessionId.Remove(0, 4);
                }
                for (int i = 0; i < length; i++)
                {
                    double flt = random.NextDouble();
                    int shift = Convert.ToInt32(Math.Floor(25 * flt));
                    letter = Convert.ToChar(shift + 65);
                    sessionId.Append(letter);
                }
            } while (this.context.Sessions.FirstOrDefault(r => r.Id == sessionId.ToString()) != null);


            return sessionId.ToString();
        }
    }
}
