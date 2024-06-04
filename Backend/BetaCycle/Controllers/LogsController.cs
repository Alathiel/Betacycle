﻿
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
using System.Text.Json;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private IMongoCollection<BsonDocument> mongoBsCollection;

        //setup mongo DB 
        public LogsController(IOptions<MongoSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            var mongoDB = mongoClient.GetDatabase(options.Value.DatabaseName);
            mongoBsCollection = mongoDB.GetCollection<BsonDocument>(options.Value.Collection);
        }

        #region HttpGet
        /// <summary>
        /// Get all logs without filters
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <returns>ActionResult, List<Log></returns>
        [Authorize(Policy = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Mongo.Log>>> GetLogs(int pageNumber = 1)
        {
            long totalLogs = 0;
            List<Models.Mongo.Log> logs = [];
            if (pageNumber <= 0)
                pageNumber = 1;
            try
            {
                var bson = await mongoBsCollection.Find(obj => true).Skip((pageNumber - 1) * 10).Limit(10).ToListAsync();
                totalLogs = await mongoBsCollection.CountDocumentsAsync(boj => true);
                foreach (var val in bson)
                {
                    var props = val.Elements.ElementAt(val.Elements.Count() - 1).Value.AsBsonDocument;
                    Models.Mongo.Log log = new();
                    foreach (var element in val.Elements)
                    {
                        if(element.Name == "Date" ||  element.Name == "Timestamp" || element.Name == "Level")
                            log.Header.Add(element.Value.AsString);
                        if (element.Name != "_id" && element.Name != "Properties")
                            log.Stats.Add(new KeyValuePair<string, string>(element.Name, element.Value.AsString));
                    }
                    
                    foreach (var bsonElement in props)
                    {
                        log.Props.Add(new KeyValuePair<string, string>(bsonElement.Name, bsonElement.Value.AsString));
                    }
                    logs.Add(log);
                }
                return Ok(new
                {
                    logs = logs,
                    totalLogs = totalLogs

                });
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
        /// Filter logs based on input params
        /// </summary>
        /// <param name="value"></param>
        /// <param name="filterC"></param>
        /// <param name="pageNumber"></param>
        /// <returns>ActionResult, List<Log></returns>
        [Authorize(Policy = "Admin")]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Models.Mongo.Log>>> GetFilteredLogs(string value="", string filterC="Date", int pageNumber = 1)
        {
            long totalLogs = 0;
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
                totalLogs = await mongoBsCollection.CountDocumentsAsync(filter);

                foreach (var val in bson)
                {
                    var props = val.Elements.ElementAt(val.Elements.Count() - 1).Value.AsBsonDocument;
                    Models.Mongo.Log log = new();
                    foreach (var element in val.Elements)
                    {
                        if (element.Name == "Date" || element.Name == "Timestamp" || element.Name == "Level")
                            log.Header.Add(element.Value.AsString);
                        if (element.Name != "_id" && element.Name != "Properties")
                            log.Stats.Add(new KeyValuePair<string, string>(element.Name, element.Value.AsString));
                    }

                    foreach (var bsonElement in props)
                    {
                        log.Props.Add(new KeyValuePair<string, string>(bsonElement.Name, bsonElement.Value.AsString));
                    }
                    logs.Add(log);
                }

                return Ok(new
                {
                    logs = logs,
                    totalLogs = totalLogs

                });
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
        /// Toggle error logging 
        /// </summary>
        /// <returns>ActionResult</returns>
        [Authorize(Policy = "Admin")]
        [HttpGet("[action]")]
        public async Task<ActionResult> ToggleLogging()
        {
            if (LogManager.IsLoggingEnabled())
            {
                LogManager.DisableLogging();
                return Ok("Logging disable");
            }
            else if (!LogManager.IsLoggingEnabled())
            {
                LogManager.EnableLogging();
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

        #region HttpPost

        /// <summary>
        /// Insert error log in our mongoDB collection 
        /// </summary>
        /// <param name="log"></param>
        /// <returns>ActionResult</returns>
        [HttpPost("[action]")]
        public async Task<ActionResult> PostError(FrontEndLog log)
        {
            try
            {
                _logger.ForErrorEvent().Properties(new List<KeyValuePair<string, object>>()
                {
                    new ("Site", "FrontEnd"),
                    log.userId != ""? new ("UserId", log.userId) : new ("UserId", "not logged"),
                    new ("Exception", log.message),
                    new ("Status code", log.statusCode),
                    new ("From", log.url)
                }).Log();
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

        #endregion

    }
}
