using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CopyProductsConsole.DataModels
{
    internal class Product
    {
        public int ProductID { get; set; }
        public string? Name { get; set; }
        public string? ProductNumber { get; set; }
        public int ProductCategoryID { get; set; }
        public string? Color { get; set; }
        public SqlMoney StandardCost { get; set; }
        public SqlMoney ListPrice { get; set; }
        public string? Size { get; set; }
        public decimal? Weght { get; set; } = 14;
        public int ProductModelID { get; set; }
        public DateTime? SellStartDate { get; set; }
        public DateTime? SellEndDate { get; set; }
        public DateTime? DiscontinuedDate { get; set; }
        public byte[]? ThumbNailPhoto { get; set; }
        public string? ThumbnailPhotoFileName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? culture { get; set; } = "en";
    }
}
