using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class ViewDeal
{
    public long ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public long ModelId { get; set; }

    public double ActualPrice { get; set; }

    public double InsertPrice { get; set; }

    public string Culture { get; set; } = null!;

    public long CategoryId { get; set; }

    public double Expr1 { get; set; }

    public byte[]? ThumbnailPhoto { get; set; }
}
