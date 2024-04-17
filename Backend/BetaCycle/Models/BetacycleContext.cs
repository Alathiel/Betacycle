using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BetaCycle.Models;

public partial class BetacycleContext : DbContext
{
    public BetacycleContext()
    {
    }

    public BetacycleContext(DbContextOptions<BetacycleContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Model> Models { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Storage> Storages { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(DbConnection.ConnectionStringBetaCycle);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.AddressId });

            entity.ToTable("Address");

            entity.Property(e => e.AddressId)
                .ValueGeneratedOnAdd()
                .HasColumnName("AddressID");
            entity.Property(e => e.Address1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Address");
            entity.Property(e => e.Cap)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CAP");
            entity.Property(e => e.City)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Nation)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Province)
                .HasMaxLength(5)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Address_User");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProductId });

            entity.ToTable("Cart");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ProductId)
                .ValueGeneratedOnAdd()
                .HasColumnName("ProductID");

            entity.HasOne(d => d.Product).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cart_Product");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Cart_User");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.HasIndex(e => e.Name, "CatName_cost").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.ToTable("Model");

            entity.HasIndex(e => e.Name, "Name_Const").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK_Product_1");

            entity.ToTable("Product", tb => tb.HasTrigger("DeleteModel"));

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Color)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Culture)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.DateInsert).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.LastModify).HasColumnType("datetime");
            entity.Property(e => e.NameProduct)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category_Product");

            entity.HasOne(d => d.Model).WithMany(p => p.Products)
                .HasForeignKey(d => d.ModelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Model");
        });

        modelBuilder.Entity<Storage>(entity =>
        {
            entity.HasKey(e => new { e.ProductId, e.Location });

            entity.ToTable("Storage");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.Location)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Product).WithMany(p => p.Storages)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Storage_Product");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProductId, e.TransactionId });

            entity.ToTable("Transaction");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.TransactionId)
                .ValueGeneratedOnAdd()
                .HasColumnName("TransactionID");

            entity.HasOne(d => d.Product).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Transaction_Product");

            entity.HasOne(d => d.User).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Transaction_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.FullName)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
