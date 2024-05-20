using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System.Text;

namespace EncryptionData
{
    public class EncryptionData
    {
        public static string Sha256Encrypt(string notEncrypted)
        {
            var sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(notEncrypted);

            if(notEncrypted.Length > 0 )
            {
                try
                {
                    byte[] hash = sha256.ComputeHash(bytes);
                    return BitConverter.ToString(hash, 0, hash.Length).Replace("-","");
                }
                catch( Exception e) { Console.WriteLine(e); }
            }
            return string.Empty;
        }

        /// <summary>
        /// Check if an inserted password is the same of the encrypted one
        /// </summary>
        /// <param name="pw"></param>
        /// <param name="encryptedPw"></param>
        /// <returns>bool</returns>
        public static string Sha256Decrypt(string pw)
        {
            var sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(pw);

            if (pw.Length > 0)
            {
                try
                {
                    byte[] hash = sha256.ComputeHash(bytes);
                    return BitConverter.ToString(hash, 0, hash.Length).Replace("-", "");
                }
                catch (Exception e) { Console.WriteLine(e); }
            }
            return string.Empty;
        }
        
         public static KeyValuePair<string,string> SaltEncrypt(string pw)
         {
            byte[] byteSalt = new byte[16];
            string encryptedResult = string.Empty;
            string encryptedSalt = string.Empty;

            try
            {
                RandomNumberGenerator.Fill(byteSalt); //fill array with random numbers
                //encrypt password
                encryptedResult = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: pw, 
                    salt: byteSalt, 
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                   numBytesRequested: 32
                ));
                //encrypt salt
                encryptedSalt = Convert.ToBase64String(byteSalt);

                return new KeyValuePair<string, string> (encryptedResult,encryptedSalt);
            }
            catch( Exception e ) { Console.WriteLine( e ); }
            return new KeyValuePair<string, string>();
         }

        public static string SaltDecrypt(string pw, string encryptedSalt)
        {

            byte[] decryptSalt = Convert.FromBase64String(encryptedSalt);
            string decryptedResult = string.Empty;

            decryptedResult = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: pw,
                    salt: decryptSalt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 32));

            return decryptedResult;
        }
    }
}
