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
        public List<QuickstarterDTO> Get([FromQuery]string category, [FromQuery]int numQuestions, [FromQuery]string difficulty)
        {
            if (numQuestions < 0) throw new ArgumentException("Parameter must be a positive integer", "numQuestions");
            if (numQuestions == 0) return null;
            //if (difficulty != ("easy" || "medium || "hard")) throw new ArgumentException("Parameter must be easy, medium, or hard", "difficulty");
            
            var response = new List<QuickstarterDTO>();

            // for now assume category and difficulty are always sent ffs
            // fetch list of possible questions, randomly generate numbers and pull elements from list
            //var dataSet = this.context.QuickstarterQuestions.Where(r => FindSubsetInDatabase(r, category, difficulty)).ToList();
            var dataSet = this.context.QuickstarterQuestions.Where(r => (r.Category == category && r.Difficulty == difficulty)).ToList();

            // ignore this
            //List<int> hashSetAllocationList = Enumerable.Range(0, numQuestions).ToList();
            //HashSet<int> hashSet = new HashSet<int>(hashSetAllocationList);
            //hashSet.Clear();

            for (int i = 0; i < numQuestions; i++)
            {
                Random rand = new Random();
                int randValue = rand.Next(0, dataSet.Count);

                // this too
                //bool foundANewValue = false;

                //while (!foundANewValue)
                //{
                //    if (!hashSet.Add(randValue))
                //    {
                //        randValue = rand.Next(0, dataSet.Count);
                //    }
                //}

                QuickstarterQuestion question = dataSet.Skip(randValue).Take(1).First();
                dataSet.RemoveAt(randValue);
                response.Add(new QuickstarterDTO() { Id = question.Id,
                                                     Category = question.Category,
                                                     Difficulty = question.Difficulty,
                                                     Question = question.Question,
                                                     Answers = question.Answers });
            }
            return response;
        }

        [HttpGet("Check")]
        public string Check([FromQuery] int id) 
        {
            // doesn't work even though it should, says question is null and throws a nullpointerexception because of question.CorrectAnswer
            // im too tired its 2:56am
            var question = this.context.QuickstarterQuestions.FirstOrDefault(r => r.Id == id);
            return question.CorrectAnswer;
        }

        private bool FindSubsetInDatabase(QuickstarterQuestion query, string category, string difficulty)
        {
            if (!string.IsNullOrEmpty(category) && (category != query.Category))
            {
                return false;
            }

            if (!string.IsNullOrEmpty(difficulty) && (category != query.Category))
            {
                return false;
            }

            return true;
        }
    }
}
