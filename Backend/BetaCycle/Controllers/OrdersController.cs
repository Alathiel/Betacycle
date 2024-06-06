﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Contexts;
using BetaCycle.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly BetacycleContext _context;

        public OrdersController(BetacycleContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Order>>> PostOrder(Order[] orders)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Transaction trans = new Transaction();
                trans.Identifier = Guid.NewGuid();
                _context.Transactions.Add(trans);
                await _context.SaveChangesAsync();


                var orderUser = await _context.Users.FindAsync(Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)));
                foreach (var order in orders)
                {
                    order.Date = DateOnly.FromDateTime(DateTime.Now);
                    order.Transaction = trans;
                    order.Product = await _context.Products.FindAsync(order.ProductId);
                    order.Product.Category = await _context.Categories.FindAsync(order.Product.CategoryId);
                    order.Product.Model = await _context.Models.FindAsync(order.Product.ModelId);
                    _context.Orders.Add(order);
                }
                await _context.SaveChangesAsync();
                var cart = await _context.Carts.Where(cart =>
                    cart.UserId == Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier))).ToListAsync();
                cart.ForEach(product => _context.Carts.Remove(product));
                await _context.SaveChangesAsync();
                transaction.Commit();
                
            }
            catch (DbUpdateException)
            {
                transaction.Rollback();
                return BadRequest();
            }
            return orders;
        }
    }
}
