using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using BetaCycle.Contexts;
using BetaCycle.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using LoginLibrary.BasicAuthentication;
using BetaCycle.BLogic;
using System.Configuration;
using NLog.Extensions.Logging;
using System;

namespace BetaCycle
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            LoggerNLog logger = new(builder.Configuration.GetConnectionString("BetaCycle"));
            try { 
               
                builder.Services.AddControllers().AddJsonOptions(x =>
                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);
                // Add services to the container.
                builder.Services.AddDbContext<BetacycleContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaCycle")));
                builder.Services.AddDbContext<BetaSecurityContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaSecurity")));
                builder.Services.AddControllers();
                // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                builder.Services.AddEndpointsApiExplorer();
                
                //jwt authentication
                JwtSettings? jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>(); //instancing jwtSettings object with the settings we setup in appsettings
                builder.Services.AddSingleton(jwtSettings); //add singleton object to services so everyone can see it
            
                builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opts =>
                opts.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true, //validate who gave a token
                    ValidateAudience = true,//validate who sends a token
                    ValidateLifetime = false, //validate lifetime of a token
                    ValidateIssuerSigningKey = true, //validate secret key
                    ValidIssuer = jwtSettings.Issuer, //issuer value
                    ValidAudience = jwtSettings.Audience, //audience value
                    //RequireExpirationTime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
                });

                

                /*builder.Services.AddLogging(loggingBuilder =>
                {
                    loggingBuilder.ClearProviders();
                    loggingBuilder.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                    loggingBuilder.AddNLog();
                });*/

                builder.Services.AddSwaggerGen();

                //Setup cors
                builder.Services.AddCors(opts =>
                {
                    opts.AddPolicy("Policies",
                        builder => builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .SetIsOriginAllowed((hosts) => true)
                    );
                });

                var app = builder.Build();


                app.UseCors("Policies");

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
            catch(Exception e)
            {
                //logger.Error(e, "Stopped program because of exception");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }
    }
}
