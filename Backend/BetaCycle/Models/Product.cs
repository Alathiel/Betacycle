using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Product
{
    public long ProductId { get; set; }

    public string NameProduct { get; set; } = null!;

    public long ModelId { get; set; }

    public double InsertPrice { get; set; }

    public double ActualPrice { get; set; }

    public string? Description { get; set; }

    public string? Color { get; set; }

    public double? Weight { get; set; }

    public string Culture { get; set; } = null!;

    public long CategoryId { get; set; }

    public DateTime DateInsert { get; set; }

    public DateTime LastModify { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Storage> Storages { get; set; } = new List<Storage>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
