using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Order
{
    public long TransactionId { get; set; }

    public long OrderId { get; set; }

    public long UserId { get; set; }

    public long ProductId { get; set; }

    public int Quantity { get; set; }

    public double ProductPrice { get; set; }

    public long IdPayment { get; set; }

    public string? Status { get; set; }

    public long AddressId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Transaction Transaction { get; set; } = null!;
}
