using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore;
using TriviaGame.Hubs;

namespace TriviaGame
{
    using System.Collections;
    using System.Collections.Generic;
    using TriviaGame.Models;
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddDbContext<TriviaDbContext>(options =>
                options.UseMySQL(Configuration.GetConnectionString("DbConnection")));

            services.AddSignalR();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.AllowCredentials()
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .WithOrigins("http://localhost:3000",
                                            "http://localhost:5890",
                                            "https://localhost:44302");
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                using (var serviceScope = app.ApplicationServices.CreateScope())
                {
                    var context = serviceScope.ServiceProvider.GetService<TriviaDbContext>();
                    //context.Database.EnsureDeleted();
                    //context.Database.EnsureCreated();
                    // Seed the database.
                    SeedData(context);
                }
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //    name: "default",
                //    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapControllers();
                endpoints.MapHub<GameHub>("/gamehub");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // spa.UseReactDevelopmentServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }

        private static void SeedData(TriviaDbContext context)
        {
            // Deletes the database
            context.Database.EnsureDeleted();
            // Creates the database fresh
            context.Database.EnsureCreated();

            // Seed Models
            var qq1 = new QuickstarterQuestion()
            {
                Id = 1,
                Category = "Science & Technology",
                Difficulty = "easy",
                Question = "What does CPU stand for?",
                CorrectAnswer = "Central Processing Unit",
                Answers = @"[""Central Process Unit"", ""Computer Personal Unit"", ""Central Processor Unit"", ""Central Processing Unit""]"
            };
            var qq2 = new QuickstarterQuestion()
            {
                Id = 2,
                Category = "Science & Technology",
                Difficulty = "easy",
                Question = "What is the longest bone in the human body?",
                CorrectAnswer = "Femur",
                Answers = @"[""Scapula"", ""Femur"", ""Fibula"", ""Ulna""]"
            };
            var qq3 = new QuickstarterQuestion()
            {
                Id = 3,
                Category = "Science & Technology",
                Difficulty = "easy",
                Question = "The element involved in making human blood red is which of the following?",
                CorrectAnswer = "Iron",
                Answers = @"[""Copper"", ""Iridium"", ""Cobalt"", ""Iron""]"
            };
            var qq4 = new QuickstarterQuestion()
            {
                Id = 4,
                Category = "Science & Technology",
                Difficulty = "easy",
                Question = "The biggest distinction between a eukaryotic cell and a prokaryotic cell is:",
                CorrectAnswer = "The presence or absence of a nucleus",
                Answers = @"[""The presence or absence of certain organelles"", ""The overall size"", ""The presence or absence of a nucleus"", ""The mode of reproduction""]"
            };
            var qq5 = new QuickstarterQuestion()
            {
                Id = 5,
                Category = "General Knowledge",
                Difficulty = "easy",
                Question = "What type of animal was Harambe, who was shot after a child fell into it's enclosure at the Cincinnati Zoo?",
                CorrectAnswer = "Gorilla",
                Answers = @"[""Gorilla"", ""Tiger"", ""Panda"", ""Crocodile""]"
            };
            var qq6 = new QuickstarterQuestion()
            {
                Id = 6,
                Category = "General Knowledge",
                Difficulty = "easy",
                Question = "Which candy is NOT made by Mars?",
                CorrectAnswer = "Almond Joy",
                Answers = @"[""Snickers"", ""M&M's"", ""Almond Joy"", ""Twix""]"
            };
            var qq7 = new QuickstarterQuestion()
            {
                Id = 7,
                Category = "General Knowledge",
                Difficulty = "easy",
                Question = "The Flag of the European Union has how many stars on it?",
                CorrectAnswer = "12",
                Answers = @"[""10"", ""12"", ""14"", ""16""]"
            };
            var qq8 = new QuickstarterQuestion()
            {
                Id = 8,
                Category = "General Knowledge",
                Difficulty = "easy",
                Question = "What is the Zodiac symbol for Gemini?",
                CorrectAnswer = "Twins",
                Answers = @"[""Fish"", ""Maiden"", ""Twins"", ""Scales""]"
            };
            var qq9 = new QuickstarterQuestion()
            {
                Id = 9,
                Category = "Entertainment",
                Difficulty = "easy",
                Question = "What is the homeworld of the Elites from Halo?",
                CorrectAnswer = "Sanghelios",
                Answers = @"[""Te"", ""Sanghelios"", ""Dosaic"", ""Eayn""]"
            };
            var qq10 = new QuickstarterQuestion()
            {
                Id = 10,
                Category = "Entertainment",
                Difficulty = "easy",
                Question = "What is the name of the world that the MMO RuneScape takes place in?",
                CorrectAnswer = "Gielinor",
                Answers = @"[""Glindor"", ""Zaros"", ""Azeroth"", ""Gielinor""]"
            };
            var qq11 = new QuickstarterQuestion()
            {
                Id = 11,
                Category = "Entertainment",
                Difficulty = "easy",
                Question = "What is the name of the game developer who created Call Of Duty: Zombies?",
                CorrectAnswer = "Treyarch",
                Answers = @"[""Sledgehammer Games"", ""Treyarch"", ""Infinity Ward"", ""Activision""]"
            };
            var qq12 = new QuickstarterQuestion()
            {
                Id = 12,
                Category = "Entertainment",
                Difficulty = "easy",
                Question = "Who is the creator of the Super Smash Bros. Series?",
                CorrectAnswer = "Masahiro Sakurai",
                Answers = @"[""Masahiro Sakurai"", ""Reggie Fils-Aime"", ""Bill Trinen"", ""Hideo Kojima""]"
            };
            var qq13 = new QuickstarterQuestion()
            {
                Id = 13,
                Category = "World Knowledge",
                Difficulty = "easy",
                Question = "Who is the creator of Filip Bicki?",
                CorrectAnswer = "Poland",
                Answers = @"[""Poland"", ""Reggie Fils-Aime"", ""Bill Trinen"", ""Hideo Kojima""]"
            };
            IList<QuickstarterQuestion> quickstarterQuestions = new List<QuickstarterQuestion>() { qq1, qq2, qq3, qq4, qq5, qq6, qq7, qq8, qq9, qq10, qq11, qq12, qq13 };
            context.QuickstarterQuestions.AddRange(quickstarterQuestions);

            // Saves changes
            context.SaveChanges();
        }
    }
}
