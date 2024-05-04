
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetaCycle.Contexts;
using BetaCycle.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using NLog;

namespace BetaCycle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger(typeof(Logger));
        private IMongoCollection<BsonDocument> mongoBsCollection;
        private readonly BetacycleContext _context;

        public LogsController(IOptions<MongoSettings> options, BetacycleContext context)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            var mongoDB = mongoClient.GetDatabase(options.Value.DatabaseName);
            mongoBsCollection = mongoDB.GetCollection<BsonDocument>(options.Value.Collection);
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Models.Mongo.Log>> GetLogs()
        {
            var bson = await mongoBsCollection.Find(obj => true).Limit(10).ToListAsync();
            List<Models.Mongo.Log> logs = [];

            foreach (var val in bson)
            {
                logs.Add(new Models.Mongo.Log()
                {
                    Date = val.Elements.ElementAt(1).Value.AsString,
                    Level = val.Elements.ElementAt(2).Value.AsString,
                    Logger = val.Elements.ElementAt(3).Value.AsString,
                    Message = val.Elements.ElementAt(4).Value.AsString,
                    Host = val.Elements.ElementAt(5).Value.AsString,
                    Callsite = val.Elements.ElementAt(6).Value.AsString
                });
            }

            return logs;
        }

        [HttpGet("date")]
        public async Task<IEnumerable<Models.Mongo.Log>> GetLogsByDate(string date)
        {
            BsonDocument filter = new BsonDocument
            {
                {
                    "Date", new BsonRegularExpression($"{date}","i")
                }
            };
    

            var bson = await mongoBsCollection.Find(filter).Limit(0).ToListAsync();
            List<Models.Mongo.Log> logs = [];
            
            foreach (var val in bson)
            {
                logs.Add(new Models.Mongo.Log()
                {
                    Date = val.Elements.ElementAt(1).Value.AsString,
                    Level = val.Elements.ElementAt(2).Value.AsString,
                    Logger = val.Elements.ElementAt(3).Value.AsString,
                    Message = val.Elements.ElementAt(4).Value.AsString,
                    Host = val.Elements.ElementAt(5).Value.AsString,
                    Callsite = val.Elements.ElementAt(6).Value.AsString,
                });
            }
            return logs;
        }
    }
}
