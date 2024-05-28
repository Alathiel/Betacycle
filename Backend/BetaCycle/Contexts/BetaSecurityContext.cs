using System;
using System.Collections.Generic;
using BetaCycle.Models;
using Microsoft.EntityFrameworkCore;

namespace BetaCycle.Contexts;

public partial class BetaSecurityContext : DbContext
{
    public BetaSecurityContext()
    {
    }

    public BetaSecurityContext(DbContextOptions<BetaSecurityContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminCredential> AdminCredentials { get; set; }

    public virtual DbSet<Credential> Credentials { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:BetaSecurity");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminCredential>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_AdminCredentials");

            entity.ToTable("AdminCredential");

            entity.HasIndex(e => e.Email, "IX_AdminCredential").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PasswordSalt)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Credential>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_Credenziali");

            entity.ToTable("Credential");

            entity.HasIndex(e => e.Email, "Email_Constraint").IsUnique();

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PasswordSalt)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => new { e.IdPayment, e.UserId });

            entity.ToTable("Payment");

            entity.Property(e => e.IdPayment).ValueGeneratedOnAdd();
            entity.Property(e => e.CircuitCard)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Cvv)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CVV");
            entity.Property(e => e.Cvvsalt)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CVVSalt");
            entity.Property(e => e.NameCard)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.NumberCard)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NumberCardSalt)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SurnameCard)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Payment_Credential");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
