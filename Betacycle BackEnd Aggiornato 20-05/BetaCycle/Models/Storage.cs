using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Storage
{
    public long ProductId { get; set; }

    public long Quantity { get; set; }

    public string Location { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
