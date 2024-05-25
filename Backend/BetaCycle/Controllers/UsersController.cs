
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using NLog;
using NLog.Fluent;
using Log = BetaCycle.Models.Log;
using System.Security.Claims;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private readonly BetacycleContext _context;

        public UsersController(BetacycleContext context)
        {
            _context = context;
        }

        #region HttpGet

        [Authorize(Policy = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                return await _context.Users.ToListAsync();
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

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<User>> GetUser()
        {
            try
            {
                var user = await _context.Users.FindAsync(Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)));
                if (user == null)
                    return NotFound();

                return user;
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


        #region HttpPost


        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new { id = user.UserId }, user);
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


        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> PutAddress(Address address)
        {

            if (await _context.Addresses.FindAsync(address.AddressId) == null)
            {
                return NotFound();
            }

            _context.Entry(address).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                _logger.ForErrorEvent().Message(e.Message).Property("userId", 1).Log();
            }

            return NoContent();
        }


        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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


        

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
