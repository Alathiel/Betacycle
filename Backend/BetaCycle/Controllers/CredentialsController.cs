using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NLog;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredentialsController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private readonly BetaSecurityContext _context;

        public CredentialsController(BetaSecurityContext context)
        {
            _context = context;
        }

        #region HttpPut

        /// <summary>
        /// Change password when you're already logged in 
        /// </summary>
        /// <param name="credential"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> ChangePasswordLogOn(Credential credential)
        {
            try
            {
                KeyValuePair<string, string> a;
                a = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
                credential.Password = a.Key;
                credential.PasswordSalt = a.Value;

                _context.Entry(credential).State = EntityState.Modified;
                await _context.SaveChangesAsync();
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
            return Ok();
        }

        #endregion

        //[Authorize]
        [HttpPatch("[action]")]
        public async Task<IActionResult> PatchPassword(Credential credential)
        {

            try
            {
                var cred = await _context.Credentials.FirstAsync(c => c.Email == credential.Email);
                if ( cred == null)
                    return BadRequest();

                KeyValuePair<string, string> temp;
                temp = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
                cred.Password = temp.Key;
                cred.PasswordSalt = temp.Value;
                cred.LastModified = DateOnly.FromDateTime(DateTime.Now);

                _context.Entry(cred).State = EntityState.Modified;
                await _context.SaveChangesAsync();
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
            return Ok();
        }
    }
}
