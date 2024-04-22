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

            //jwt authentication
            JwtSettings? jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>(); //instancing jwtSettings object with the settings we setup in appsettings
            builder.Services.AddSingleton(jwtSettings); //add singleton object to services so everyone can see it
            
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opts =>
            opts.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true, //validate who gave a token
                ValidateAudience = true,//validate who sends a token
                ValidateLifetime = true, //validate lifetime of a token
                ValidateIssuerSigningKey = true, //validate secret key
                ValidIssuer = jwtSettings.Issuer, //issuer value
                ValidAudience = jwtSettings.Audience, //audience value
                RequireExpirationTime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
            });
            //end jwt authentication

            /*
            //basic authentication
            BasicAuthenticationHandler.connectionString = builder.Configuration.GetConnectionString("SqlClient");
            builder.Configuration.GetConnectionString("BetaSecurity");
            builder.Services.AddAuthentication()
            .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", opt => { });
            builder.Services.AddAuthorization
            (opt =>
                opt.AddPolicy("BasicAuthentication", new AuthorizationPolicyBuilder("BasicAuthentication").RequireAuthenticatedUser().Build())
            );
            //end basic authentication
            */



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
