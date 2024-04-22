using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BetaCycle.Contexts;
using BetaCycle.Models;
using LoginLibrary.JwtAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace BetaCycle.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginJwtController : ControllerBase
    {
        private readonly BetaSecurityContext _context;
        private JwtSettings _jwtSettings;
        private JwtToken token;
        public LoginJwtController(JwtSettings jwtSettings, BetaSecurityContext context)
        {
            _context = context;
            _jwtSettings = jwtSettings;
            token = new(_jwtSettings);
        }

        
        [HttpPost("/JwtLogin")]
        public IActionResult Login(string email, string password)
        {
            //var cred = _context.Credentials.Where(e => e.Email == credentials.Email).ToList();
            var cred = _context.Credentials.Where(e => e.Email == email).ToList();

            if (cred.Count > 0)
            {
                var pw = EncryptionData.EncryptionData.SaltDecrypt(password, cred[0].PasswordSalt);
                if(pw == cred[0].Password)
                {
                    //var token = this.token.GenerateJwtToken(credentials.Email, credentials.Password);
                    var token = this.token.GenerateJwtToken(email, password);
                    return Ok(new { token });
                }
                else
                    return BadRequest("Wrong Password");
            }
            else
                return BadRequest();
        }
    }
}
