﻿using Azure.Core;
using BasicLoginLibrary;
using BetaCycle.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BetaCycle.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class AuthenticationController: ControllerBase
    {
        private readonly BetaSecurityContext _context;
        private readonly BetacycleContext _context2;

        public AuthenticationController(BetaSecurityContext context)
        {
            _context = context;
        }

        [HttpGet("/{id}")]
        public async Task<ActionResult<Credential>> GetCredential(long id)
        {
            var cred = await _context.Credentials.FindAsync(id);
            if (cred == null)
            {
                return NotFound();
            }

            return cred;
        }


        // [BasicAuthorizationAttributes] means request authorization
        [BasicAuthorizationAttributes]
        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Credential>>> Login(string email)
        {
            var cred = await _context.Credentials.Where(e => e.Email == email).ToListAsync();

            if (cred == null)
            {
                return NotFound();
            }

            return cred;
        }

        [HttpPost]
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
                if (_context.Credentials.Any(e => e.UserId == credential.UserId))
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
    }
}
