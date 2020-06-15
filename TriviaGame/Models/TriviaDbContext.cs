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
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating modelBuilder;

        //    modelBuilder.Entity<Publisher>(entity =>
        //    {
        //        entity.HasKey(e => e.ID);
        //        entity.Property(e => e.Name).IsRequired();
        //    });

        //    modelBuilder.Entity<Book>(entity =>
        //    {
        //        entity.HasKey(e => e.ISBN);
        //        entity.Property(e => e.Title).IsRequired();
        //        entity.HasOne(d => d.Publisher)
        //          .WithMany(p => p.Books);
        //    });
        //}
    }
}
