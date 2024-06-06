using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Transaction
{
    public long TransactionId { get; set; }

    public Guid Identifier { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
