using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BetaCycle.Models;

public partial class BetaSecurityContext : DbContext
{
    public BetaSecurityContext()
    {
    }

    public BetaSecurityContext(DbContextOptions<BetaSecurityContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Credential> Credentials { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(DbConnection.ConnectionStringBetaSecurity);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Cvv)
                .HasMaxLength(3)
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
                .HasMaxLength(20)
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
