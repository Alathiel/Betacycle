namespace BetaCycle.Models.Mongo
{
    public class Log
    {
        public List<string> Header { get; set; } = [];
        public List<KeyValuePair<string, string>> Stats { get; set; } = [];
        public List<KeyValuePair<string,string>> Props { get; set; } = [];
    }
}
