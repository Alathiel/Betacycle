using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Contexts;
using BetaCycle.Models;
using Microsoft.AspNetCore.Authorization;
using NLog;
using System.Security.Claims;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private readonly BetacycleContext _context;

        public AddressesController(BetacycleContext context)
        {
            _context = context;
        }

        #region HttpGet

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            return await _context.Addresses.Where(address => address.UserId == Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier))).ToListAsync();
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<Address>> GetAddress(long addressId)
        {
            var address = await _context.Addresses.FindAsync(Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)), addressId);
            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        #endregion


        // POST: api/Addresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<Address>> PostAddress(Address address)
        {
            try
            {
                address.UserId = Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier));
                User user = await _context.Users.FirstOrDefaultAsync(user => user.UserId == Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)));
                if (user == null)
                {
                    return BadRequest("Invalid");
                }
                address.User = user;
                _context.Addresses.Add(address);
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

            return Created();
        }

        // DELETE: api/Addresses/5
        [Authorize]
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteAddress(long addressId)
        {
            try
            {
                var address = await _context.Addresses.FindAsync(Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)),addressId);
                if (address == null)
                {
                    return NotFound();
                }

                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();

                return Ok();
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

        // PUT: api/Addresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> PutAddress(Address address)
        {
            address.User = await _context.Users.FindAsync(address.UserId);
            
            _context.Entry(address).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(address.AddressId))
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

        private bool AddressExists(long id)
        {
            return _context.Addresses.Any(e => e.UserId == id);
        }
    }
}
