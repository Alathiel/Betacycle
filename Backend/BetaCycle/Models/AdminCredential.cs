using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class AdminCredential
{
    public long UserId { get; set; }

    public string Password { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateOnly LastModified { get; set; }
}
