namespace BetaCycle.Models
{
    public class JwtSettings
    {
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public string? SecretKey { get; set; }
    }

    public class JwtAdminSettings: JwtSettings
    {
        public int ExpirationMinutes { get; set; }
    }

}
