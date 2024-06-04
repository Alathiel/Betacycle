using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Order
{
    public long UserId { get; set; }

    public long ProductId { get; set; }

    public Guid TransactionId { get; set; }

    public int Quantity { get; set; }

    public double ProductPrice { get; set; }

    public long IdPayment { get; set; }

    public string? Status { get; set; }

    public virtual User User { get; set; } = null!;
}
