using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TriviaGame.Models
{
    public class User
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }

    }
}
