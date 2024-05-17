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
using NLog;

namespace BetaCycle.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JwtAuthenticationController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private readonly BetaSecurityContext _context;
        private JwtSettings _jwtSettings, _jwtAdminSettings;
        private JwtToken token;
        public JwtAuthenticationController(JwtSettings jwtSettings, JwtAdminSettings jwtAdminSettings, BetaSecurityContext context)
        {
            _context = context;
            _jwtSettings = jwtSettings;
            _jwtAdminSettings = jwtAdminSettings;
            token = new(jwtSettings, jwtAdminSettings);
        }

        #region Users

        [HttpPost("/JwtLogin")]
        public IActionResult Login(Credential credentials)
        {
            var cred = _context.Credentials.Where(e => e.Email == credentials.Email).ToList();
            try
            {
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
                        var token = this.token.GenerateJwtToken(credentials.Email, cred[0].UserId); 
                        //var token = this.token.GenerateJwtToken(email, password);
                        return Ok(new
                        {
                            userId = cred[0].UserId,
                            Status = 200,
                            Token = token

                        });
                    }
                    return BadRequest("Wrong Password");
                }
                return BadRequest("Email not found");
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest("Unexpected error has been encountered");
            }
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<Credential>> Register(Credential credential)
        {
            try
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
                //return CreatedAtAction("GetCredential", new { id = credential.UserId }, credential);
                return Created();
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest("Unexpected error has been encountered");
            }
        }

        #endregion

        #region Admin

        [HttpPost("[action]")]
        public IActionResult AdminLogin(AdminCredential credential)
        {
            var cred = _context.AdminCredentials.Where(e => e.Email == credential.Email).ToList();
            //var cred = _context.Credentials.Where(e => e.Email == email).ToList();

            if (cred.Count > 0)
            {
                var pw = EncryptionData.EncryptionData.SaltDecrypt(credential.Password, cred[0].PasswordSalt);
                //var pw = EncryptionData.EncryptionData.SaltDecrypt(password, cred[0].PasswordSalt);
                if (pw == cred[0].Password)
                {
                    if ((DateOnly.FromDateTime(DateTime.Now).DayNumber - cred[0].LastModified.DayNumber) > 100)
                        return BadRequest(new
                        {
                            Status = 401,
                            Description = "Password expired"
                        });

                    var token = this.token.GenerateJwtAdminToken(credential.Email, cred[0].UserId);
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

        /*[Authorize(Policy = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<Credential>> RegisterAdmin(AdminCredential credential)
        {
            KeyValuePair<string, string> temp;
            temp = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
            credential.Password = temp.Key;
            credential.PasswordSalt = temp.Value;
            _context.AdminCredentials.Add(credential);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (_context.AdminCredentials.Any(e => e.Email == credential.Email))
                    return Conflict();
                else
                    throw;
            }
            //return CreatedAtAction("GetCredential", new { id = credential.UserId }, credential);
            return Created();
        }*/
        
        #endregion

    }
}
