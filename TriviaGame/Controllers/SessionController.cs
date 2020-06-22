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
            var newSession = new Session() { Id = newSessionId, Users = null, GamePhase = 0 };
            this.context.Sessions.Add(newSession);
            this.context.SaveChanges();
            return newSessionId;
        }

        [HttpGet("Get/{id}")]
        //public IEnumerable<UserDTO> Get(string id)
        public IActionResult Get(string id)
        {
            if (!ValidateRoomCode(id)) return StatusCode(400, "Room code sent was malformed");

            var dataSet = this.context.Users.Where(x => x.SessionId == id).Select(x =>
                new UserDTO
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToList();
            return Ok(dataSet);
        }

        [HttpPost("Join")]
        public IActionResult Join(User user) 
        {
            if (!ValidateRoomCode(user.SessionId)) return StatusCode(400, "Room code sent was malformed");
            if (!ValidateName(user.Name)) return StatusCode(400, "User name sent was malformed");

            var existingSession = this.context.Sessions.Include(r => r.Users).FirstOrDefault(r => r.Id == user.SessionId);
            if (existingSession == null)
            {
                return NotFound("Session does not exist");
            }
            if (existingSession.Users.Count == 4)
            {
                return StatusCode(409, "This game room is already full");
            }
            if (existingSession.GamePhase > 0)
            {
                // TODO: figure out what logic to do if the game is already underway and not in the lobby
                return StatusCode(409, "This game is already in progress");
            }
            if (existingSession.Users.Any(r => r.Name == user.Name))
            {
                return StatusCode(409, "Another user exists with that name already");
            }
            existingSession.Users.Add(user);
            this.context.SaveChanges();
            return Ok(existingSession.Users.ToList());
        }

        [HttpPost("IncrementGamePhase/{id}")]
        public IActionResult IncrementGamePhase(string id) 
        {
            if (!ValidateRoomCode(id)) return StatusCode(400, "Room code sent was malformed");

            var existingSession = this.context.Sessions.Where(r => r.Id == id).FirstOrDefault();
            if (existingSession == null)
            {
                return NotFound("Tried to increment game phase on a session that doesn't exist, what the hell happened");
            }
            existingSession.GamePhase += 1;
            this.context.SaveChanges();
            return Ok(existingSession.GamePhase);
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

        private bool ValidateRoomCode(string id)
        {
            return id.All(char.IsLetter) && (id.Length == 4);
        }
        
        private bool ValidateName(string name)
        {
            return name.All(c => char.IsLetterOrDigit(c) || c == '_');
        }
    }
}
