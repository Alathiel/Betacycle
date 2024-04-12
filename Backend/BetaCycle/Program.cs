
using BetaCycle.Models;
using Microsoft.EntityFrameworkCore;

namespace BetaCycle
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<BetacycleContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaCycle")));
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(opts =>
            {
                opts.AddPolicy("CORSAIR",
                    builder => builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed((hosts) => true)
                );
            });

            var app = builder.Build();


            app.UseCors("CORSAIR");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
