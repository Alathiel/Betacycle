using System.Drawing;

namespace BetaCycle.BLogic
{
    public class test
    {
        public static byte[] convert()
        {
            System.Drawing.Image im = System.Drawing.Image.FromFile("");
            using (var ms = new MemoryStream())
            {
                im.Save(ms, im.RawFormat);
                return ms.ToArray();
            }
        }
    }
}
