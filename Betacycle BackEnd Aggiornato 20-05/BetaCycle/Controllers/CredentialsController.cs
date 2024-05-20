using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;

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

        // GET: api/Credentials
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Credential>>> GetCredentials()//login
        {
            return await _context.Credentials.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Credential>> GetCredential(long id)//login
        {
            var credentials = await _context.Credentials.FindAsync(id);

            if (credentials == null)
            {
                return NotFound();
            }

            return credentials;
        }

        // GET: api/Credentials/5
        [HttpGet("{email}/{password}")]
        public async Task<List<Credential>> GetLogin(string email, string password)
        {
            var salt = await _context.Credentials.Where(data => data.Email == email).Select(data => data.PasswordSalt).ToListAsync();
            if (salt.Count > 0)
            {
                password = EncryptionData.EncryptionData.SaltDecrypt(password, salt.ElementAt(0));
                var credential = await _context.Credentials.Where(data =>
                    data.Email == email && data.Password == password
                ).ToListAsync();
                
                if (credential == null)
                {
                    return [];
                }
                return credential;
            }

            return [];
        }

        // PUT: api/Credentials/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCredential(long id, Credential credential)
        {
            if (id != credential.UserId)
            {
                return BadRequest();
            }

            //KeyValuePair<string, string> a;
            //a = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
            //credential.Password = a.Key;
            //credential.PasswordSalt = a.Value;

            _context.Entry(credential).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CredentialExists(id))
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

        [Authorize]
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> PutCredentialPassword(long id, Credential credential)
        {
            if (id != credential.UserId)
            {
                return BadRequest();
            }

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
                if (!CredentialExists(id))
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

        // POST: api/Credentials
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Credential>> PostCredential(Credential credential)
        {
            KeyValuePair<string, string> a;
            a = EncryptionData.EncryptionData.SaltEncrypt(credential.Password);
            credential.Password = a.Key;
            credential.PasswordSalt = a.Value;
            _context.Credentials.Add(credential);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CredentialExists(credential.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCredential", new { id = credential.UserId }, credential);
        }

        // DELETE: api/Credentials/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCredential(long id)
        {
            var credential = await _context.Credentials.FindAsync(id);
            if (credential == null)
            {
                return NotFound();
            }

            _context.Credentials.Remove(credential);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CredentialExists(long id)
        {
            return _context.Credentials.Any(e => e.UserId == id);
        }
    }
}
