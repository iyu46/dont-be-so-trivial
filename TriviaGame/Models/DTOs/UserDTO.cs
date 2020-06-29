using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TriviaGame.Models.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public bool Host { get; set; }
        public int CurrQuestionId { get; set; }
        public string CurrQuestionAnswer { get; set; }
    }
}
