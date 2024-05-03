
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;
using NLog;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        //LogFactory.GetCurrentClassLogger<UsersController>()

        private readonly BetacycleContext _context;

        public UsersController(BetacycleContext context)
        {
            _context = context;
        }

        #region HttpGet

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {

            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            try { 
            var user = await _context.Users.FindAsync(id);
            int x = 0;
            Console.WriteLine(1 / x);
            if (user == null)
            {
                return NotFound();
            }

                return user;
            }
            catch (Exception e)
            {
                _logger.Error("{e}",e);
                return BadRequest();
            }
        }



        [HttpGet("[Action]/{id}")]
        public async Task<ActionResult<List<Address>>> Addresses(int id)
        {
            var addresses = await _context.Addresses.Where(address => address.UserId == id).ToListAsync();

            if (addresses.Count <= 0)
            {
                return NotFound();
            }

            return addresses;
        }


        #endregion


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


        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<User>> PostAddress(Address address)
        {
            User user = await _context.Users.FirstOrDefaultAsync( user => user.UserId == address.UserId);

            if (user == null)
            {
                return BadRequest("Invalid");
            }

            address.User = user;
            _context.Addresses.Add(address);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                code = 201,
                address
            });
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
