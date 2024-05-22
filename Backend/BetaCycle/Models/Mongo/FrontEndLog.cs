namespace BetaCycle.Models.Mongo
{
    public class FrontEndLog
    {
        public string statusCode { get; set; }
        public string url { get; set; }
        public string message { get; set; }
        public string userId { get; set; }
    }
}
