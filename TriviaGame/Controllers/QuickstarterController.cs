using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TriviaGame.Models;
using TriviaGame.Models.DTOs;

namespace TriviaGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Route("[controller]/[action]")]
    public class QuickstarterController : ControllerBase
    {
        private readonly TriviaDbContext context;

        public QuickstarterController(TriviaDbContext context)
        {
            this.context = context;
        }

        [HttpGet("Get")]
        public QuickstarterDTO Get([FromQuery]string category, [FromQuery]int numQuestions, [FromQuery]string difficulty)
        {
            var question = this.context.QuickstarterQuestions.FirstOrDefault(r => r.Id == 1);
            return new QuickstarterDTO()
            {
                Id = question.Id,
                Category = question.Category,
                Difficulty = question.Difficulty,
                Question = question.Question,
                Answers = question.Answers
            };
        }

        /*[HttpPost]
        public QuickstarterQuestion CheckAnswer()
        {

        }*/
    }
}
