
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
        public async Task<IEnumerable<Models.Mongo.Log>> GetLogs()
        {
            var bson = await mongoBsCollection.Find(obj => true).Limit(0).ToListAsync();
            List<Models.Mongo.Log> logs = [];

            foreach (var val in bson)
            {
                var props =val.Elements.ElementAt(val.Elements.Count() - 1).Value.AsBsonDocument;
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
                    log.Props.Add(new KeyValuePair<string, string>(bsonElement.Name,bsonElement.Value.AsString));
                }

                logs.Add(log);
            }

            KeyValuePair<string, string>[] a = [];
            return logs;
        }

        [HttpGet("[action]/{date}/{filterData}/{pageNumber}")]
        public async Task<IEnumerable<Models.Mongo.Log>> GetLogsByDate(string date, string filterData, int pageNumber = 1)
        {
            BsonDocument filter = new BsonDocument
            {
                {
                    filterData, new BsonRegularExpression($"{date}","i")
                }
            };

            if (pageNumber <= 0)
                pageNumber = 1;
            var bson = await mongoBsCollection.Find(filter).Skip((pageNumber-1)*10).Limit(10).ToListAsync();
            List<Models.Mongo.Log> logs = [];

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
            return logs;
        }

        [HttpGet("[action]/{id}")]
        public async Task<IEnumerable<Models.Mongo.Log>> GetLogsByUserId(string id)
        {
            BsonDocument filter = new BsonDocument
            {
                {
                    "Properties.user", new BsonRegularExpression($"{id}","i")
                }
            };


            var bson = await mongoBsCollection.Find(filter).Limit(0).ToListAsync();
            List<Models.Mongo.Log> logs = [];

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
            return logs;
        }

        #endregion


    }
}
