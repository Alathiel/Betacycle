using System;
using System.Collections.Generic;

namespace BetaCycle.Models.Security;

public partial class Credential
{
    public long UserId { get; set; }

    public string Password { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
