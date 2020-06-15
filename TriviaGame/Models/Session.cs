using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TriviaGame.Models
{
    public class Session
    {
        public string Id { get; set; }
        public User[] Players { get; set; }
        public int GamePhase { get; set; }
        //public  QuestionSet { get; set; }

    }
}
