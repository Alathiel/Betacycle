
using BetaCycle.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using BasicLoginLibrary;
using BetaCycle.Contexts;

namespace BetaCycle
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

            // Add services to the container.
            builder.Services.AddDbContext<BetacycleContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaCycle")));
            builder.Services.AddDbContext<BetaSecurityContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaSecurity")));
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            //istruzioni login
            BasicAuthenticationHandler.connectionString = @"Data Source=DESKTOP-5BBAMIC\SQLEXPRESS01;Initial Catalog=BetaSecurity;Integrated Security=True;Connect Timeout=30;Encrypt=False;";
            //builder.Configuration.GetConnectionString("BetaSecurity");
            builder.Services.AddAuthentication()
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", opt => { });
            builder.Services.AddAuthorization
            (opt =>
                opt.AddPolicy("BasicAuthentication", new AuthorizationPolicyBuilder("BasicAuthentication").RequireAuthenticatedUser().Build())
            );
            //fine istruction login
            builder.Services.AddSwaggerGen();

            //Setup cors
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

            app.UseAuthorization();//for login


            app.MapControllers();

            app.Run();
        }
    }
}
