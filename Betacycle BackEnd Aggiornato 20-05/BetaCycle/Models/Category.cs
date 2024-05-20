using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Category
{
    public long CategoryId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
