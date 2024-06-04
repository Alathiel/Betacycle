using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using BetaCycle.Contexts;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NLog;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelsController : ControllerBase
    {
        private readonly BetacycleContext _context;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        public ModelsController(BetacycleContext context)
        {
            _context = context;
        }

        #region HttpGet

        /// <summary>
        /// Get all models
        /// </summary>
        /// <returns>List<Model></returns>
        [HttpGet]
        public async Task<IEnumerable<Model>> GetModels()
        {
            return await _context.Models.ToListAsync();
        }

        #endregion

        #region HttpPost

        /// <summary>
        /// Used by Admins to add models 
        /// </summary>
        /// <param name="model"></param>
        /// <returns>ActionResult, Model</returns>
        [Authorize(Policy = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Model>> PostModel(Model model)
        {
            try{
                _context.Models.Add(model);
                await _context.SaveChangesAsync();

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
    }
}
