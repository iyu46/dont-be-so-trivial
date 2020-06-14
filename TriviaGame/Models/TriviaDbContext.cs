using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace TriviaGame.Models
{
    public class TriviaDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<QuickstarterQuestion> QuickstarterQuestions { get; set; }

        public TriviaDbContext(DbContextOptions<TriviaDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.UseMySQL(_configuration.GetConnectionString["DbConnection"]);
            
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    //base.OnModelCreating modelBuilder;

        //    //modelBuilder.Entity<
        //}
    }
}
