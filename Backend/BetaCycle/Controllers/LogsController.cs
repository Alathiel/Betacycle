
using System.Security.Claims;
using BetaCycle.BLogic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Contexts;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using NLog;
using BetaCycle.Models.Mongo;
using BetaCycle.Models;
using LoginLibrary.JwtAuthentication;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private IMongoCollection<BsonDocument> mongoBsCollection;

        public LogsController(IOptions<MongoSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            var mongoDB = mongoClient.GetDatabase(options.Value.DatabaseName);
            mongoBsCollection = mongoDB.GetCollection<BsonDocument>(options.Value.Collection);
        }

        #region HttpGet

        [Authorize(Policy = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Mongo.Log>>> GetLogs(int pageNumber = 1)
        {
            List<Models.Mongo.Log> logs = [];
            if (pageNumber <= 0)
                pageNumber = 1;
            try
            {
                var bson = await mongoBsCollection.Find(obj => true).Skip((pageNumber - 1) * 10).Limit(10).ToListAsync();
                foreach (var val in bson)
                {
                    var props = val.Elements.ElementAt(val.Elements.Count() - 1).Value.AsBsonDocument;
                    Models.Mongo.Log log = new()
                    {
                        Date = val.Elements.ElementAt(1).Value.AsString,
                        Level = val.Elements.ElementAt(2).Value.AsString,
                        Logger = val.Elements.ElementAt(3).Value.AsString,
                        Message = val.Elements.ElementAt(4).Value.AsString,
                        Host = val.Elements.ElementAt(5).Value.AsString,
                        Callsite = val.Elements.ElementAt(6).Value.AsString,
                        Timestamp = val.Elements.ElementAt(7).Value.AsString
                    };
                    foreach (var bsonElement in props)
                    {
                        log.Props.Add(new KeyValuePair<string, string>(bsonElement.Name, bsonElement.Value.AsString));
                    }
                    logs.Add(log);
                }
                KeyValuePair<string, string>[] a = [];
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
            return logs;
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Models.Mongo.Log>>> GetFilteredLogs(string value="", string filterC="Date", int pageNumber = 1)
        {
            List<Models.Mongo.Log> logs = [];
            try
            {
                BsonDocument filter = new BsonDocument
                {
                    {
                        filterC, new BsonRegularExpression($"{value}", "i")
                    }
                };
                if (pageNumber <= 0)
                    pageNumber = 1;
                var bson = await mongoBsCollection.Find(filter).Skip((pageNumber - 1) * 10).Limit(10).ToListAsync();

                foreach (var val in bson)
                {
                    var props = val.Elements.ElementAt(val.Elements.Count() - 1).Value.AsBsonDocument;
                    Models.Mongo.Log log = new()
                    {
                        Date = val.Elements.ElementAt(1).Value.AsString,
                        Level = val.Elements.ElementAt(2).Value.AsString,
                        Logger = val.Elements.ElementAt(3).Value.AsString,
                        Message = val.Elements.ElementAt(4).Value.AsString,
                        Host = val.Elements.ElementAt(5).Value.AsString,
                        Callsite = val.Elements.ElementAt(6).Value.AsString,
                        Timestamp = val.Elements.ElementAt(7).Value.AsString
                    };
                    foreach (var bsonElement in props)
                    {
                        log.Props.Add(new KeyValuePair<string, string>(bsonElement.Name, bsonElement.Value.AsString));
                    }

                    logs.Add(log);
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

            return logs;
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Models.Mongo.Log>>> GetLogsByUserId(string id)
        {
            List<Models.Mongo.Log> logs = [];
            try
            {
                BsonDocument filter = new BsonDocument
                {
                    {
                        "Properties.UserId", id
                    }
                };

                var bson = await mongoBsCollection.Find(filter).Limit(0).ToListAsync();
                foreach (var val in bson)
                {
                    var props = val.Elements.ElementAt(val.Elements.Count() - 1).Value.AsBsonDocument;
                    Models.Mongo.Log log = new()
                    {
                        Date = val.Elements.ElementAt(1).Value.AsString,
                        Level = val.Elements.ElementAt(2).Value.AsString,
                        Logger = val.Elements.ElementAt(3).Value.AsString,
                        Message = val.Elements.ElementAt(4).Value.AsString,
                        Host = val.Elements.ElementAt(5).Value.AsString,
                        Callsite = val.Elements.ElementAt(6).Value.AsString,
                        Timestamp = val.Elements.ElementAt(7).Value.AsString
                    };
                    foreach (var bsonElement in props)
                    {
                        log.Props.Add(new KeyValuePair<string, string>(bsonElement.Name, bsonElement.Value.AsString));
                    }

                    logs.Add(log);
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
            return logs;
        }

        [Authorize(Policy = "Admin")]
        [HttpPost("[action]")]
        public ActionResult ToggleLogging()
        {
            if (LogManager.IsLoggingEnabled())
            {
                LogManager.SuspendLogging();
                return Ok("Logging disable");
            }
            else if (!LogManager.IsLoggingEnabled())
            {
                LogManager.ResumeLogging();
                return Ok("Logging enabled");
            }
            return BadRequest();
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("[action]")]
        public bool GetLoggingStatus()
        {
            return LogManager.IsLoggingEnabled();
        }

        #endregion


    }
}
