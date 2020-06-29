using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TriviaGame.Models
{
    public class User
    {
        public int Id { get; set; }
        [ForeignKey("Session")]
        public virtual string SessionId { get; set; }
        public virtual Session Session { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public bool Host { get; set; }
        public int CurrQuestionId { get; set; }
        public string CurrQuestionAnswer { get; set; }
    }
}
