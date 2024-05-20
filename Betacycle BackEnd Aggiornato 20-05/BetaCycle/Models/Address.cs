using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Address
{
    public long UserId { get; set; }

    public string City { get; set; } = null!;

    public string Address1 { get; set; } = null!;

    public string Cap { get; set; } = null!;

    public string Province { get; set; } = null!;

    public string Nation { get; set; } = null!;

    public long AddressId { get; set; }

    public virtual User User { get; set; } = null!;
}
