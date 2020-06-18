using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TriviaGame.Models
{
    public class Session
    {
        public string Id { get; set; }
        public ICollection<User> Users { get; set; }
        public int GamePhase { get; set; }

        public Session()
        {
            this.Users = new List<User>();
        }

    }
}
