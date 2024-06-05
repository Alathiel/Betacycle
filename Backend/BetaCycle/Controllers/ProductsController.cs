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
using LoginLibrary.JwtAuthentication;
using System.Data.SqlClient;
using System.Security.Claims;

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

        /// <summary>
        /// Get all products without filters
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <returns>ActionResult, List<Product></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int pageNumber = 1)
        {
            if (pageNumber <= 0)
                pageNumber = 1;
            try
            {
                var products = await _context.Products.Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                var totalProducts = await _context.Products.LongCountAsync();
                if (products == null || products.Count<=0)
                    return NotFound();
                return Ok(new
                {
                    products = products,
                    totalProducts = totalProducts
                });
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest();
            }
        }

        /// <summary>
        /// Get filtered products 
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="productName"></param>
        /// <param name="color"></param>
        /// <param name="price"></param>
        /// <param name="operand"></param>
        /// <param name="id"></param>
        /// <returns>ActionResult, List<Product></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Product>>> FilterProducts(int pageNumber = 1, string productName = "", string color = "", decimal price = 0, string operand = "", long id = 0)
        {
            //
            if (pageNumber <= 0)
                pageNumber = 1;
            if (operand != ">" && operand != "<") 
                operand = ">";
            try
            {
                List<Product> products = [];
                long totalProducts = 0;
                if (operand == "<")
                {
                    if ((productName == "" && color == "" && price == 0))
                    {
                        products = await _context.Products
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                        totalProducts = await _context.Products.LongCountAsync();
                    }
                    else if ((productName != "" || color != "" || price > 0) && price > 0)
                    {
                        products = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower())
                            && product.ActualPrice <= (int)price)
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                        totalProducts = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower())
                            && (product.ActualPrice <= (int)price)).LongCountAsync();
                    }
                    else if ((productName != "" || color != "") && price <= 0)
                    {
                        products = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower()))
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                        totalProducts = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower())).LongCountAsync();
                    }
                }
                if (operand == ">")
                {
                    if ((productName == "" && color == "" && price == 0))
                    {
                        products = await _context.Products
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                        totalProducts = await _context.Products.LongCountAsync();
                    }
                    else if ((productName != "" || color != "" || price >= 0) && price >= 0)
                    {
                        products = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower())
                            && product.ActualPrice >= (int)price)
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                        totalProducts = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower())
                            && (product.ActualPrice >= (int)price)).LongCountAsync();
                    }
                    else if ((productName != "" || color != "") && price <= 0)
                    {
                        products = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower()))
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                        totalProducts = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())
                            && product.Color.ToLower().Contains(color.ToLower())).LongCountAsync();
                    }
                }
                else if (id != 0)
                {
                    products = await _context.Products.Where(product => product.ProductId == id).ToListAsync();
                    totalProducts = await _context.Products.Where(product => product.ProductId == id).LongCountAsync();
                }
                return Ok(new
                {
                    products,
                    totalProducts
                });
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
        {
            new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
            new ("Exception", e),
        }).Log();
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Product>> GetProduct(long id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                    return NotFound();

                return product;
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Product>> GetProductDetails(long id)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Model)
                    .Include(p => p.Category)
                    .FirstAsync();
                if (product == null)
                    return NotFound();

                return product;
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ViewDeal>>> GetDeals()
        {
            try
            {
                var product = await _context.ViewDeals.ToListAsync();
                if (product == null || product.Count <= 0)
                    return NotFound();

                return product;
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest();
            }
        }

        #endregion

        #region HttpPost

        /// <summary>
        /// Used by admins to add a product
        /// </summary>
        /// <param name="product"></param>
        /// <returns>ActionResult, Product</returns>
        [Authorize(Policy = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            try
            {
                product.Model = await _context.Models.FindAsync(product.ModelId);
                product.Category = await _context.Categories.FindAsync(product.CategoryId);
                product.DateInsert = DateOnly.FromDateTime(DateTime.Now);
                product.LastModify = product.DateInsert;

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
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

        #region HttpPut

        /// <summary>
        /// Used by admins to edit a product
        /// </summary>
        /// <param name="product"></param>
        /// <returns>ActionResult, Product</returns>
        [Authorize(Policy = "Admin")]
        [HttpPut("[action]")]
        public async Task<ActionResult<Product>> PutProduct(Product product)
        {
            try
            {
                product.Model = await _context.Models.FindAsync(product.ModelId);
                product.Category = await _context.Categories.FindAsync(product.CategoryId);
                _context.Entry(product).State = EntityState.Modified;
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

            return product;
        }

        #endregion

        #region HttpDelete
        
        /// <summary>
        /// Used by admins to delete a product
        /// </summary>
        /// <param name="id"></param>
        /// <returns>IActionResult</returns>
        [Authorize(Policy = "Admin")]
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound();
                }

                _context.Products.Remove(product);
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
                return BadRequest("Unexpected error has occurred.");
            }
        }

        #endregion
    }
}
