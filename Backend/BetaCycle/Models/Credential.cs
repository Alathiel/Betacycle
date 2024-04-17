using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Credential
{
    public long UserId { get; set; }

    public string Password { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
