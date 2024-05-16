using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Log
{
    public DateOnly Date { get; set; }

    public string Type { get; set; } = null!;

    public string? Description { get; set; }

    public string? BrowserOrigin { get; set; }

    public long LogId { get; set; }
}
