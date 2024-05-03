using BetaCycle.Models;
using global::BetaCycle.Models;
using Microsoft.DotNet.Scaffolding.Shared;
using NLog;
using NLog.Mongo;
using NLog.Targets;
using LogLevel = NLog.LogLevel;

namespace BetaCycle.BLogic
{
    public class LoggerNLog
    {
        private static Logger nLogLogger = LogManager.GetCurrentClassLogger();

        public LoggerNLog(string connectionString)
        {
            var config = new NLog.Config.LoggingConfiguration();

            // Targets where to log to: File and Console
            var logfile = new FileTarget("logfile") { FileName = "file.txt" };
            var logconsole = new ColoredConsoleTarget("logconsole");
            logconsole.Layout = "${longdate} - ${level:uppercase=true} - ${logger} - ${callsite} - ${message}";
            var dbtarget = new DatabaseTarget()
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

            var dbMongoTarget = new MongoTarget()
            {
                CollectionName = "Logs",
                DatabaseName = "BetaCycleLogs",
                ConnectionString = "mongodb://localhost:27017/",

                Fields =
                {
                    new MongoField("Date","${shortdate}","DateTime"),
                    new MongoField("Level","${level:uppercase=true}"),
                    new MongoField("Host","${machinename}")
                },

                CappedCollectionSize = 20000000
                
            };

            // Rules for mapping loggers to targets            
            config.AddRule(LogLevel.Error, LogLevel.Fatal, dbtarget);
            config.AddRule(LogLevel.Info, LogLevel.Fatal, logconsole);
            config.AddRule(LogLevel.Error, LogLevel.Fatal, dbMongoTarget);

            // Apply config           
            LogManager.Configuration = config;
            TestNLogMethod();
        }

        private void TestNLogMethod()
        {
            int x = 0;
            try
            {
                Console.WriteLine(1 / x);
            }
            catch (Exception e)
            {
                    //automatically takes the first parameter as {x} - structured logs
                    nLogLogger.Error("{error}", e);
                
                
            }
        }
    }

}
