using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class User
{
    public long UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public DateOnly? BirthDate { get; set; }

    public string? Phone { get; set; }

    public byte Security { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
