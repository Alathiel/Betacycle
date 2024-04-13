using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Payment
{
    public long IdPayment { get; set; }

    public string NumberCard { get; set; } = null!;

    public string NumberCardSalt { get; set; } = null!;

    public string Cvv { get; set; } = null!;

    public string Cvvsalt { get; set; } = null!;

    public DateOnly ExpirationDate { get; set; }

    public string NameCard { get; set; } = null!;

    public string SurnameCard { get; set; } = null!;

    public string CircuitCard { get; set; } = null!;

    public long UserId { get; set; }

    public virtual Credential User { get; set; } = null!;
}
