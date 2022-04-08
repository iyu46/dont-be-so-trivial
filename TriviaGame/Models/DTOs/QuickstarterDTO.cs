﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TriviaGame.Models.DTOs
{
    public class QuickstarterDTO
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Difficulty { get; set; }
        public string Question { get; set; }
        public List<string> Answers { get; set; }
    }
}
