﻿using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class ViewDeal
{
    public long ProductId { get; set; }

    public string NameProduct { get; set; } = null!;

    public long ModelId { get; set; }

    public double ActualPrice { get; set; }

    public double InsertPrice { get; set; }

    public string? Description { get; set; }

    public string Culture { get; set; } = null!;

    public long CategoryId { get; set; }

    public double Deal { get; set; }
}
