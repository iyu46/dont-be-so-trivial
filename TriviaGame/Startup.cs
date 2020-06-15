using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore;

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
            //services.AddControllersWithViews();
            services.AddControllers();
            //services.AddSingleton<IConfiguration>(Configuration);
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddDbContext<TriviaDbContext>(options =>
                options.UseMySQL(Configuration.GetConnectionString("DbConnection")));
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

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //    name: "default",
                //    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapControllers();
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
            //context.Database.EnsureDeleted();
            // Creates the database fresh
            context.Database.EnsureCreated();

            // Seed Models
            //var qq1 = new QuickstarterQuestion()
            //{
            //    Id = 1,
            //    Category = "Science",
            //    Difficulty = "easy",
            //    Question = "What does CPU stand for?",
            //    CorrectAnswer = "Central Processing Unit",
            //    Answers =@"[""Central Process Unit"", ""Computer Personal Unit"", ""Central Processor Unit"", ""Central Processing Unit""]"
            //};
            //context.QuickstarterQuestions.Add(qq1);

            // Saves changes
            context.SaveChanges();
        }
    }
}
