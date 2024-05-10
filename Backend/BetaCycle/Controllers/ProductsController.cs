using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Models;
using BetaCycle.Contexts;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using Model = BetaCycle.Models.Model;
using NLog;
using System.IdentityModel.Tokens.Jwt;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private readonly BetacycleContext _context;

        public ProductsController(BetacycleContext context)
        {
            _context = context;
        }

        #region HttpGet

        // GET: api/Products
        [HttpGet("[action]/{pageNumber}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int pageNumber = 1)
        {
            if (pageNumber <= 0)
                pageNumber = 1;
            try
            {
                //_context.Products.FromSql($"Select NameProduct from Products").OrderBy(ob => ob.NameProduct).Take(10);
                //return await _context.Products.Skip(0).Take(10).ToListAsync();
                return await _context.Products.Skip((pageNumber-1)*10).Take(10).ToListAsync();
                //return await _context.Products.Include(p => p.Model).Include(p => p.Category).Skip(0).Take(10).ToListAsync();
            }
            catch (Exception e)
            {
                @HttpContext.Request.Headers.TryGetValue("Authorization", out var tokenString);
                var jwtEncodedString = tokenString.ToString().Substring(7);
                var token = new JwtSecurityToken(jwtEncodedString);
                var userId = token.Claims.First(c => c.Type == "nameid").Value;
                _logger.Error("user {userId} error {error}", userId,  e.Message);
                return BadRequest();
            }
        }

        [HttpGet("/Categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetProductsCategories()
        {
            return await _context.Categories.ToListAsync();
        }


        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpGet("/Deals")]
        public async Task<ActionResult<IEnumerable<ViewDeal>>> GetDeals()
        {
            var product = await _context.ViewDeals.ToListAsync();

            if (product == null || product.Count<=0)
            {
                return NotFound();
            }

            return product;
        }

        #endregion

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(long id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            Model model = await _context.Models.FindAsync(product.ModelId);
            Category category = await _context.Categories.FindAsync(product.CategoryId);

            if (category == null )
            {
                return BadRequest();
            }

            product.Model = model;
            product.Category = category;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(long id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
