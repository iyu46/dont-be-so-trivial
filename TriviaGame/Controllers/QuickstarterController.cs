using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TriviaGame.Models;

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
        public QuickstarterQuestion Get([FromQuery]string category, [FromQuery]int numQuestions, [FromQuery]string difficulty)
        {
            return this.context.QuickstarterQuestions.FirstOrDefault(r => r.Id == 1);
        }

        /*[HttpPost]
        public QuickstarterQuestion CheckAnswer()
        {

        }*/
    }
}
