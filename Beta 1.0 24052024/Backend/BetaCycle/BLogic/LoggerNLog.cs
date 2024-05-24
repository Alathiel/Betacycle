using MongoDB.Bson;
using NLog;
using NLog.Mongo;
using NLog.Targets;
using LogLevel = NLog.LogLevel;

namespace BetaCycle.BLogic
{
    public class LoggerNLog
    {
        private static Logger _nLogLogger = LogManager.GetCurrentClassLogger();
        public LoggerNLog(IConfigurationSection opts, string connectionString = "")
        {
            var config = new NLog.Config.LoggingConfiguration();
            
            var logConsole = new ColoredConsoleTarget("logconsole");
            logConsole.Layout = "${longdate} - ${level:uppercase=true} - ${logger} - ${callsite} - ${message}";
            MongoTarget mongoDB = SetupMongo(opts);

            // Rules for mapping loggers to targets            
            //config.AddRule(LogLevel.Error, LogLevel.Fatal, SetupMySql(connectionString));
            config.AddRule(LogLevel.Info, LogLevel.Fatal, logConsole);
            config.AddRule(LogLevel.Error, LogLevel.Fatal, mongoDB);

            // Apply config           
            LogManager.Configuration = config;
        }


        #region Private methods

        /// <summary>
        /// Given all settings setup a Mongo database for logs
        /// </summary>
        /// <param name="opts"></param>
        /// <returns>MongoTarget object</returns>
        private static MongoTarget SetupMongo(IConfigurationSection opts)
        {
            return new MongoTarget()
            {
                CollectionName = opts.GetSection("Collection").Value,
                DatabaseName = opts.GetSection("DatabaseName").Value,
                ConnectionString = opts.GetSection("ConnectionString").Value,

                Fields =
                {
                    new MongoField("Date","${shortdate}", "String"),
                    new MongoField("Level","${level:uppercase=true}"),
                    new MongoField("Host","${machinename}"),
                    new MongoField("Callsite","${callsite}"),
                    new MongoField("Timestamp","${time}")
                },

                CappedCollectionSize = 20000000
            };
        }

        /// <summary>
        /// Given all settings setup a MySql database for logs
        /// </summary>
        /// <param name="connectionString"></param>
        /// <returns>DatabaseTarget object</returns>
        private static DatabaseTarget SetupMySql(string connectionString)
        {
            return new DatabaseTarget()
            {
                Name = "Betacycle",
                ConnectionString = connectionString,
                CommandText = "insert into Logs(Date,Type, Description, BrowserOrigin) values(@Date,@Type,@Description,@local);",
                Parameters =
                {
                    new DatabaseParameterInfo("@Date", new NLog.Layouts.SimpleLayout(DateTime.Now.ToString())),
                    new DatabaseParameterInfo("@Type", new NLog.Layouts.SimpleLayout("${level:uppercase=true}")),
                    new DatabaseParameterInfo("@Description", new NLog.Layouts.SimpleLayout("${callsite}")),
                    new DatabaseParameterInfo("@local", new NLog.Layouts.SimpleLayout("${machinename}"))
                }
            };
        }


        /*public static void SetField()
        {
            mongoDB.Fields.Insert(0, new MongoField("Date", "${shortdate}", "String"));
        }

        public static void RemoveField(MongoTarget db)
        {
            db.Fields.RemoveAt(0);
        }*/

        #endregion

    }

}
