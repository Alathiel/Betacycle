using System;
using System.Collections.Generic;

namespace BetaCycle.Models;

public partial class Product
{
    public long ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public string ProductNumber { get; set; } = null!;

    public long ModelId { get; set; }

    public double InsertPrice { get; set; }

    public double ActualPrice { get; set; }

    public string? Description { get; set; }

    public string? Color { get; set; }

    public double? Weight { get; set; }

    public string Culture { get; set; } = null!;

    public long CategoryId { get; set; }

    public DateOnly DateInsert { get; set; }

    public DateOnly LastModify { get; set; }

    public byte[]? ThumbnailPhoto { get; set; }

    public string? ThumbnailPhotoFileName { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Category Category { get; set; } = null!;

    public virtual Model Model { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Storage> Storages { get; set; } = new List<Storage>();
}
