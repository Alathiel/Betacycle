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

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly BetacycleContext _context;

        public CartsController(BetacycleContext context)
        {
            _context = context;
        }

        // GET: api/Carts
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


        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("[action]")]
        public async Task<IActionResult> PutCart(Cart cart)
        {

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
                return BadRequest();
            }
        }



        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(long id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(long id)
        {
            return _context.Carts.Any(e => e.UserId == id);
        }
    }
}
