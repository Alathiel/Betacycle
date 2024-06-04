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
        /// <summary>
        /// Get all address linked to user account
        /// </summary>
        /// <returns>ActionResult, List<Address></returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            return await _context.Addresses.Where(address => address.UserId == Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier))).ToListAsync();
        }

        /// <summary>
        /// Get one specific address based on AddressId
        /// </summary>
        /// <param name="addressId"></param>
        /// <returns>ActionResult, Address</returns>
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

        #region HttpPost
        
        /// <summary>
        /// Used by users to add an address
        /// </summary>
        /// <param name="address"></param>
        /// <returns>ActionResult, Address</returns>
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

        #endregion

        #region HttpPut

        /// <summary>
        /// Used by users to edit an address
        /// </summary>
        /// <param name="address"></param>
        /// <returns>IAcctionResult</returns>
        [Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> PutAddress(Address address)
        {
            try
            {
                if (await _context.Addresses.FindAsync(address.AddressId) == null)
                {
                    return NotFound();
                }
                _context.Entry(address).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest("Unexpected error has occurred.");
            }
            return Ok();
        }

        #endregion

        #region HttpDelete
        /// <summary>
        /// Used by users to delete an address
        /// </summary>
        /// <param name="addressId"></param>
        /// <returns>IActionResult</returns>
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

        #endregion
    }
}
