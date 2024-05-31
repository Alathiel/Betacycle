namespace BetaCycle.Models
{
    public class RegisterUser
    {
        public Credential cred { get; set; } = new ();
        public User user { get; set; } = new();
    }
}
