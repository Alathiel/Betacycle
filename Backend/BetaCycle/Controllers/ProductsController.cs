﻿using System;
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

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int pageNumber = 1)
        {
            //_context.Products.FromSql($"Select NameProduct from Products").OrderBy(ob => ob.NameProduct).Take(10);
            if (pageNumber <= 0)
                pageNumber = 1;
            try
            {
                var products = await _context.Products.Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                if(products == null || products.Count<=0)
                    return NotFound();
                return products;
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new KeyValuePair<string, object>("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new KeyValuePair<string, object>("Exception", e),
                }).Log();
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Product>>> FilterProducts(int pageNumber = 1, string productName = "", long id = 0)
        {
            //
            if (pageNumber <= 0)
                pageNumber = 1;
            try
            {
                List<Product> products = [];
                if(productName != "")
                {
                    //non usiamo fromsqlraw perche' altrimenti saremmo vulnerabili ad sql injection
                    products = await _context.Products
                        .Where(product => product.ProductName.ToLower().Contains(productName.ToLower()))
                        .Skip((pageNumber - 1) * 10).Take(10).ToListAsync();
                }
                else if(id != 0)
                    products = await _context.Products.Where(product => product.ProductId == id).ToListAsync();
                //if (products == null || products.Count<=0)
                //    return NotFound();
                return products;
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new KeyValuePair<string, object>("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new KeyValuePair<string, object>("Exception", e),
                }).Log();
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

        [HttpGet("/Deals")]
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
                _logger.Error("User Type: Admin, Userid: {userId} error: {error}", User.FindFirstValue(ClaimTypes.NameIdentifier), e.Message);
                return BadRequest();
            }
        }

        #endregion

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Policy = "Admin")]
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
        [Authorize(Policy = "Admin")]
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
        [Authorize(Policy = "Admin")]
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
