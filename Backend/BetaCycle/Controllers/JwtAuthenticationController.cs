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
    public class JwtAuthenticationController : ControllerBase
    {
        private readonly BetaSecurityContext _context;
        private JwtSettings _jwtSettings;
        private JwtToken token;
        public JwtAuthenticationController(JwtSettings jwtSettings, BetaSecurityContext context)
        {
            _context = context;
            _jwtSettings = jwtSettings;
            token = new(_jwtSettings);
        }

        
        [HttpPost("/JwtLogin")]
        public IActionResult Login(Credential credentials)
        {
            var cred = _context.Credentials.Where(e => e.Email == credentials.Email).ToList();
            //var cred = _context.Credentials.Where(e => e.Email == email).ToList();

            if (cred.Count > 0)
            {
                var pw = EncryptionData.EncryptionData.SaltDecrypt(credentials.Password, cred[0].PasswordSalt);
                //var pw = EncryptionData.EncryptionData.SaltDecrypt(password, cred[0].PasswordSalt);
                if (pw == cred[0].Password)
                {
                    if ((DateOnly.FromDateTime(DateTime.Now).DayNumber - cred[0].LastModified.DayNumber) > 100)
                        return BadRequest(new {
                            Status = 401,
                            Description = "Password expired"
                        });
                    
                    var token = this.token.GenerateJwtToken(credentials.Email, credentials.Password);
                    //var token = this.token.GenerateJwtToken(email, password);
                    return Ok(new
                    {
                        userId = cred[0].UserId,
                        Status = 200,
                        Token = token

                    });
                }
                else
                    return BadRequest("Wrong Password");
            }
            else
                return BadRequest();
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<Credential>> Register(Credential credential)
        {
            KeyValuePair<string, string> temp;
            temp = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
            credential.Password = temp.Key;
            credential.PasswordSalt = temp.Value;
            _context.Credentials.Add(credential);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (_context.Credentials.Any(e => e.UserId == credential.UserId || e.Email == credential.Email))
                    return Conflict();
                else
                    throw;
            }
            return CreatedAtAction("GetCredential", new { id = credential.UserId }, credential);
        }
        
    }
}
