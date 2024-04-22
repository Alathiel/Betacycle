using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;


namespace LoginLibrary.BasicAuthentication
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public static string connectionString { get; set; }
        public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
            : base(options, logger, encoder, clock) { }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            Response.Headers.Add("WWW-Authenticate", "Basic");
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Task.FromResult(AuthenticateResult.Fail("Autorizzazione mancante"));
            }

            var authorizationHeader = Request.Headers["Authorization"].ToString();
            var authorHeaderRegEx = new Regex("Basic (.*)");
            if (!authorHeaderRegEx.IsMatch(authorizationHeader))
                return Task.FromResult(AuthenticateResult.Fail("Autorizzazione non valida."));

            var auth64 = Encoding.UTF8.GetString(Convert.FromBase64String(authorHeaderRegEx.Replace(authorizationHeader, "$1")));
            var authArraySplit = auth64.Split(Convert.ToChar(":"), 2);
            var authEmail = authArraySplit[0];
            var authPassword = authArraySplit.Length > 1 ? authArraySplit[1] : throw new Exception("Password non presente.");

            if (string.IsNullOrEmpty(authEmail.Trim()) || string.IsNullOrEmpty(authPassword.Trim()))
            {

                return Task.FromResult(AuthenticateResult.Fail("Autorizzazione mancante"));
            }
            else
            {
                Dictionary<string, string?> temp = [];
                try
                {
                    using (SqlConnection sqlcn = new SqlConnection(connectionString))
                    {
                        sqlcn.Open();
                        using (SqlCommand sqlcmd = new())
                        {
                            sqlcmd.Connection = sqlcn;
                            sqlcmd.CommandText = $"Select * from Credential where Email='{authEmail}'";
                            using (SqlDataReader sqlReader = sqlcmd.ExecuteReader())
                            {

                                while (sqlReader.Read())
                                {
                                    temp.Add("Password", sqlReader["Password"].ToString());
                                    temp.Add("Salt", sqlReader["PasswordSalt"].ToString());
                                    temp.Add("UserId", sqlReader["UserId"].ToString());
                                }

                            }
                        }
                    }


                    if (temp.Count > 0)
                    {
                        if (EncryptionData.EncryptionData.SaltDecrypt(authPassword, temp.GetValueOrDefault("Salt")) !=
                           temp.GetValueOrDefault("Password"))
                            return Task.FromResult(AuthenticateResult.Fail("Password not matching."));
                    }
                    else
                        return Task.FromResult(AuthenticateResult.Fail("Email not found."));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

            var authenticatedUser = new AuthenticatedUser("BasicAuthentication", true, authArraySplit[0]);
            var claimsMain = new ClaimsPrincipal(new ClaimsIdentity(authenticatedUser));
            return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsMain, Scheme.Name)));
        }
    }
}
