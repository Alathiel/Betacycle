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
using System.Security.Claims;
using NLog;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private readonly BetacycleContext _context;

        public CartsController(BetacycleContext context)
        {
            _context = context;
        }

        #region HttpGet

        /// <summary>
        /// Get all products in user cart
        /// </summary>
        /// <returns>IQueryable<Cart></returns>
        [Authorize]
        [HttpGet("[action]")]
        public async Task<IQueryable<Cart>> GetCart()
        {
            var cart = _context.Carts
                .Include(cart => cart.Product)
                .ThenInclude(product => product.Carts)
                .Where(cart => cart.UserId == Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return cart;
        }

        #endregion


        #region HttpPost

        /// <summary>
        /// Used by users to add products to cart
        /// </summary>
        /// <param name="cart"></param>
        /// <returns>ActionResult, Cart</returns>
        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            try
            {
                cart.UserId = Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier));
                cart.Product = await _context.Products.FindAsync(cart.ProductId);
                cart.User = await _context.Users.FindAsync(cart.UserId);
                var found = await _context.Carts.FindAsync(cart.UserId, cart.ProductId);
                if (found != null)
                {
                    found.Quantity += cart.Quantity;
                    await PutCart(found);
                    return Ok();
                }
                else
                {
                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
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


        #region HttpPut

        /// <summary>
        /// Used by users to edit the number of one specific product in their cart
        /// </summary>
        /// <param name="cart"></param>
        /// <returns>IactionResult</returns>
        [HttpPut("[action]")]
        public async Task<IActionResult> PutCart(Cart cart)
        {
            try
            {
                _context.Entry(cart).State = EntityState.Modified;
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


        #region HttpDelete
        /// <summary>
        /// Used by users to delete a product from cart
        /// </summary>
        /// <param name="productId"></param>
        /// <returns>IActionResult</returns>
        [Authorize]
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteCart(long productId)
        {
            try
            {
                var cart = await _context.Carts.FindAsync(
                    Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)), productId);
                if (cart == null)
                {
                    return NotFound();
                }
                _context.Carts.Remove(cart);
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
    }
}
