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
using NLog;
using System.Security.Claims;
using System.Net;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
using Amazon.SecurityToken.Model;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly BetaSecurityContext _context;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));

        public PaymentsController(BetaSecurityContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments.Where(p => p.UserId == Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier))).ToListAsync();
        }


        // GET: api/Payments/5
        /*[Authorize]
        [HttpGet("{userId}")]
        public async Task<ActionResult<Payment>> GetPayment()
        {
            try
            {           
             var payment = await _context.Payments.FindAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
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
        }*/

        // PUT: api/Payments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(long id, Payment payment)
        {
            if (id != payment.IdPayment)
            {
                return BadRequest();
            }

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
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

        // POST: api/Payments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<Payment>> PostPayment(Payment payment)
        {
            try
            {
                payment.UserId = Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier));
                KeyValuePair<string, string> card, cvv,tmp;
                card = EncryptionData.EncryptionData.SaltEncrypt(payment.NameCard);
                cvv = EncryptionData.EncryptionData.SaltEncrypt(payment.Cvv);
                payment.NumberCard = card.Key;
                payment.NumberCardSalt = card.Value;
                payment.Cvv = cvv.Key;
                payment.Cvvsalt = cvv.Value;
                payment.User = await _context.Credentials.FindAsync(payment.UserId);
                _context.Payments.Add(payment);
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
                       

            return Created();
        }

        // DELETE: api/Payments/5
        [Authorize]
        [HttpDelete("[controller]")]
        public async Task<IActionResult> DeletePayment(long idPayment)
        {
            try
            {
                var payment = await _context.Payments.FindAsync(idPayment, Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier)));
                if (payment == null)
                {
                    return NotFound();
                }

                _context.Payments.Remove(payment);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                _logger.ForErrorEvent().Message(e.Message).Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("UserId", User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    new ("Exception", e),
                }).Log();
                return BadRequest("Unexpected error has been encountered");
                throw;
            }
        }

        private bool PaymentExists(long id)
        {
            return _context.Payments.Any(e => e.IdPayment == id);
        }
    }
}
