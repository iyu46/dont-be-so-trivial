using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TriviaGame.Models
{    
    public class QuickstarterQuestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Category { get; set; }
        public string Topic { get; set; }
        public string Difficulty { get; set; }
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
        public string Answers { get; set; }
    }
}
