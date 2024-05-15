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
using Microsoft.Extensions.Options;
using BetaCycle.Models.Mongo;
using System.Security.Claims;

namespace BetaCycle
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            try { 
               
                builder.Services.AddControllers().AddJsonOptions(x =>
                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);
                // Add services to the container.
                builder.Services.AddDbContext<BetacycleContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaCycle")));
                builder.Services.AddDbContext<BetaSecurityContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BetaSecurity")));
                builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("MongoDB"));
                //setup logger
                LoggerNLog logger = new(
                    builder.Configuration.GetSection("MongoDB"),
                    builder.Configuration.GetConnectionString("BetaCycle")
                );
                builder.Services.AddControllers();
                builder.Services.AddEndpointsApiExplorer();
                
                //setup authentication
                JwtSettings? jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>(); //instancing jwtSettings object with the settings we setup in appsettings
                JwtSettings? jwtSettingsAdmin = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
                builder.Services.AddSingleton(jwtSettings); //add singleton object to services so everyone can see it
                builder.Services.AddSingleton(jwtSettingsAdmin);

                builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(opts =>
                        opts.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                        {
                            ValidateIssuer = true, 
                            ValidateAudience = true, 
                            ValidateLifetime = false, 
                            ValidateIssuerSigningKey = true, 
                            ValidIssuer = jwtSettings.Issuer, 
                            ValidAudience = jwtSettings.Audience, 
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
                        })
                    .AddJwtBearer("Admin",opts =>
                        opts.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                        {
                            ValidateIssuer = true, //validate who gave a token
                            ValidateAudience = true,//validate who sends a token
                            ValidateLifetime = true, //validate lifetime of a token
                            ValidateIssuerSigningKey = true, //validate secret key
                            ValidIssuer = jwtSettingsAdmin.Issuer, //issuer value
                            ValidAudience = jwtSettingsAdmin.Audience, //audience value
                            RequireExpirationTime = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
                        });

                builder.Services.AddAuthorization(options =>
                {
                    options.AddPolicy("Admin", policy =>
                    {
                        policy.AuthenticationSchemes.Add("Admin");
                        policy.RequireAuthenticatedUser();
                        policy.RequireClaim(ClaimTypes.Role, "Admin");
                    });
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

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseCors("Policies");
                app.UseHttpsRedirection();
                app.UseAuthorization();//for login
                app.MapControllers();
                app.Run();
            }
            catch(Exception e)
            {
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }
    }
}
