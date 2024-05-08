namespace BetaCycle.Models.Mongo
{
    public class Log
    {
        public string? Date { get; set; }
        public string? Level { get; set; } 
        public string? Logger { get; set; }
        public string? Message { get; set; }
        public string Host { get; set; }
        public string? Callsite { get; set; }
        public string? Timestamp { get; set; }
        public List<KeyValuePair<string,string>> Props { get; set; } = [];
    }
}
