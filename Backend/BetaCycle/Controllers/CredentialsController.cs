using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredentialsController : ControllerBase
    {
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
            KeyValuePair<string, string> a;
            a = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
            credential.Password = a.Key;
            credential.PasswordSalt = a.Value;

            _context.Entry(credential).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CredentialExists(credential.UserId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        #endregion

        //[Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> PutCredentialPassword( Credential credential)
        {
            var cred = _context.Credentials.Where( c=> c.Email==credential.Email).ToList();
            if ( cred.Count()<=0)
            {
                return BadRequest();
            }

            KeyValuePair<string, string> a;
            a = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
            cred[0].Password = a.Key;
            cred[0].PasswordSalt = a.Value;

            _context.Entry(cred[0]).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CredentialExists(cred[0].UserId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool CredentialExists(long id)
        {
            return _context.Credentials.Any(e => e.UserId == id);
        }
    }
}
