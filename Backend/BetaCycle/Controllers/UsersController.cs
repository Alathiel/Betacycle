
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
using System.Data;
using Microsoft.Data.SqlClient;

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

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns>ActionResult, List<User></returns>
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

        /// <summary>
        /// Get user infos when needed
        /// </summary>
        /// <returns>ActionResult, User</returns>
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

        #region HttpPut

        /// <summary>
        /// Used by users to edit their infos
        /// </summary>
        /// <param name="user"></param>
        /// <returns>ActionResult</returns>
        [Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> PutUser(User user)
        {
            try
            {
                _context.Entry(user).State = EntityState.Modified;
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
        /// Used by users to delete their account and all datas linked to them
        /// </summary>
        /// <returns>IActionResult</returns>
        /// <exception cref="DbUpdateException"></exception>
        [Authorize]
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteUser()
        {
            try
            {
                var a = Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var sqlP1 = new SqlParameter("@userId", a);
                var sqlPOut = new SqlParameter
                {
                    ParameterName = "@result",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };

                await _context.Database.ExecuteSqlRawAsync(@$"
                    Exec [Betacycle].[dbo].[DeleteUser] @userId, @rowsAffected=@result OUTPUT",
                    sqlP1, sqlPOut
                );

                if ((int)sqlPOut.Value < 2)
                    throw new DbUpdateException();

                return Ok();
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
        }

        #endregion

    }
}
