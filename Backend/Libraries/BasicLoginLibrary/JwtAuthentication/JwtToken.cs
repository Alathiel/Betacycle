using BetaCycle.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace LoginLibrary.JwtAuthentication
{
    public class JwtToken
    {
        private readonly JwtSettings _jwtSettings;
        private readonly JwtSettings _jwtAdminSettings;

        public JwtToken(JwtSettings jwtSettings, JwtSettings jwtAdminSettings)
        {
            _jwtSettings = jwtSettings;
            _jwtAdminSettings = jwtAdminSettings;
        }


        #region Token Generators

        public string GenerateJwtToken(string email, long id)
        {
            var secretKey = _jwtSettings.SecretKey;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                    new Claim(ClaimTypes.Role,"User")
                }),
                //Expires = DateTime.Now.AddMinutes(_jwtSettings.ExpirationMinutes),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string GenerateJwtAdminToken(string email, long id)
        {
            var secretKey = _jwtAdminSettings.SecretKey;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                    new Claim(ClaimTypes.Role,"Admin")
                }),
                Expires = DateTime.Now.AddMinutes(_jwtAdminSettings.ExpirationMinutes),
                Issuer = _jwtAdminSettings.Issuer,
                Audience = _jwtAdminSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        #endregion
    }
}
