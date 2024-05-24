﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ParsingService.Infrastructure.DbContexts;

#nullable disable

namespace ParsingService.Infrastructure.Migrations
{
    [DbContext(typeof(ParsingDbContext))]
    [Migration("20240524220030_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0-preview.3.24172.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AddressMetroStation", b =>
                {
                    b.Property<long>("AddressId")
                        .HasColumnType("bigint");

                    b.Property<double>("MetroStationId")
                        .HasColumnType("double precision");

                    b.HasKey("AddressId", "MetroStationId");

                    b.HasIndex("MetroStationId");

                    b.ToTable("AddressMetroStation");
                });

            modelBuilder.Entity("EventBus.IntegrationEventLog.IntegrationEventLogEntry", b =>
                {
                    b.Property<Guid>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("EventTypeName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("State")
                        .HasColumnType("integer");

                    b.Property<int>("TimesSent")
                        .HasColumnType("integer");

                    b.Property<Guid>("TransactionId")
                        .HasColumnType("uuid");

                    b.HasKey("EventId");

                    b.ToTable("IntegrationEventLog", (string)null);
                });

            modelBuilder.Entity("KeySkillVacancy", b =>
                {
                    b.Property<string>("KeySkillId")
                        .HasColumnType("text");

                    b.Property<long>("VacancyId")
                        .HasColumnType("bigint");

                    b.HasKey("KeySkillId", "VacancyId");

                    b.HasIndex("VacancyId");

                    b.ToTable("KeySkillVacancy");
                });

            modelBuilder.Entity("LanguageLevel", b =>
                {
                    b.Property<string>("LanguageId")
                        .HasColumnType("text");

                    b.Property<string>("LevelId")
                        .HasColumnType("text");

                    b.HasKey("LanguageId", "LevelId");

                    b.HasIndex("LevelId");

                    b.ToTable("LanguageLevel");
                });

            modelBuilder.Entity("LanguageVacancy", b =>
                {
                    b.Property<string>("LanguagesId")
                        .HasColumnType("text");

                    b.Property<long>("VacancyId")
                        .HasColumnType("bigint");

                    b.HasKey("LanguagesId", "VacancyId");

                    b.HasIndex("VacancyId");

                    b.ToTable("LanguageVacancy");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Address", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("AddressId");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Building")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<double?>("Lat")
                        .HasColumnType("double precision");

                    b.Property<double?>("Lng")
                        .HasColumnType("double precision");

                    b.Property<string>("Street")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Address", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Area", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("AreaId");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("ParentId");

                    b.ToTable("Area", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Employer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("EmployerId");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("IdFromBasicWebsite")
                        .HasColumnType("text");

                    b.Property<string>("LogoUrl")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Employer", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Employment", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("EmploymentId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Employment", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Experience", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("ExperienceId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Experience", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.KeySkill", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("KeySkillId");

                    b.HasKey("Name");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("KeySkill", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Language", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("LanguageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Language", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Level", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("LevelId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Level", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.MetroLine", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("MetrolLineId");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long?>("AreaId")
                        .HasColumnType("bigint");

                    b.Property<string>("HexColor")
                        .HasMaxLength(7)
                        .HasColumnType("character varying(7)");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("MetroLine", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.MetroStation", b =>
                {
                    b.Property<double>("Id")
                        .HasColumnType("double precision")
                        .HasColumnName("MetroStationId");

                    b.Property<double?>("Lat")
                        .HasColumnType("double precision");

                    b.Property<long?>("LineId")
                        .HasColumnType("bigint");

                    b.Property<double?>("Lng")
                        .HasColumnType("double precision");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("Order")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("LineId");

                    b.ToTable("MetroStation", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.ProfessionalRole", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("ProfessionalRoleId");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("ParentId");

                    b.ToTable("ProfessionalRole", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Schedule", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("ScheduleId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Schedule", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Type", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("TypeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Type", (string)null);
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Vacancy", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("VacancyId");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long?>("AddressId")
                        .HasColumnType("bigint");

                    b.Property<bool>("Archived")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<long?>("AreaId")
                        .HasColumnType("bigint");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<long?>("EmployerId")
                        .HasColumnType("bigint");

                    b.Property<string>("EmploymentId")
                        .HasColumnType("text");

                    b.Property<string>("ExperienceId")
                        .HasColumnType("text");

                    b.Property<string>("IdFromWebwite")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OriginalVacancyUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ParsingTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("PublishedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ScheduleId")
                        .HasColumnType("text");

                    b.Property<string>("TypeId")
                        .HasColumnType("text");

                    b.Property<string>("WebsiteLogoUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("WebsiteName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("WebsiteUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AddressId")
                        .IsUnique();

                    b.HasIndex("AreaId");

                    b.HasIndex("EmployerId")
                        .IsUnique();

                    b.HasIndex("EmploymentId");

                    b.HasIndex("ExperienceId");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("ScheduleId");

                    b.HasIndex("TypeId");

                    b.ToTable("Vacancy", (string)null);
                });

            modelBuilder.Entity("ProfessionalRoleVacancy", b =>
                {
                    b.Property<long>("ProfessionalRolesId")
                        .HasColumnType("bigint");

                    b.Property<long>("VacancyId")
                        .HasColumnType("bigint");

                    b.HasKey("ProfessionalRolesId", "VacancyId");

                    b.HasIndex("VacancyId");

                    b.ToTable("ProfessionalRoleVacancy");
                });

            modelBuilder.Entity("AddressMetroStation", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.Address", null)
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ParsingService.Domain.Entities.Models.MetroStation", null)
                        .WithMany()
                        .HasForeignKey("MetroStationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KeySkillVacancy", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.KeySkill", null)
                        .WithMany()
                        .HasForeignKey("KeySkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ParsingService.Domain.Entities.Models.Vacancy", null)
                        .WithMany()
                        .HasForeignKey("VacancyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LanguageLevel", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.Language", null)
                        .WithMany()
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ParsingService.Domain.Entities.Models.Level", null)
                        .WithMany()
                        .HasForeignKey("LevelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LanguageVacancy", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.Language", null)
                        .WithMany()
                        .HasForeignKey("LanguagesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ParsingService.Domain.Entities.Models.Vacancy", null)
                        .WithMany()
                        .HasForeignKey("VacancyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Area", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.Area", "Parent")
                        .WithMany("Areas")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.MetroLine", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.Area", "Area")
                        .WithMany("Lines")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Area");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.MetroStation", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.MetroLine", "Line")
                        .WithMany("Stations")
                        .HasForeignKey("LineId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Line");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.ProfessionalRole", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.ProfessionalRole", "Parent")
                        .WithMany("Roles")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Vacancy", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.Address", "Address")
                        .WithOne()
                        .HasForeignKey("ParsingService.Domain.Entities.Models.Vacancy", "AddressId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("ParsingService.Domain.Entities.Models.Area", "Area")
                        .WithMany()
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("ParsingService.Domain.Entities.Models.Employer", "Employer")
                        .WithOne()
                        .HasForeignKey("ParsingService.Domain.Entities.Models.Vacancy", "EmployerId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("ParsingService.Domain.Entities.Models.Employment", "Employment")
                        .WithMany()
                        .HasForeignKey("EmploymentId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("ParsingService.Domain.Entities.Models.Experience", "Experience")
                        .WithMany()
                        .HasForeignKey("ExperienceId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("ParsingService.Domain.Entities.Models.Schedule", "Schedule")
                        .WithMany()
                        .HasForeignKey("ScheduleId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("ParsingService.Domain.Entities.Models.Type", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.OwnsOne("ParsingService.Domain.Entities.Models.Salary", "Salary", b1 =>
                        {
                            b1.Property<long>("VacancyId")
                                .HasColumnType("bigint");

                            b1.Property<string>("Currency")
                                .IsRequired()
                                .HasColumnType("text")
                                .HasColumnName("Currency");

                            b1.Property<int?>("From")
                                .HasColumnType("integer")
                                .HasColumnName("From");

                            b1.Property<bool>("Gross")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("boolean")
                                .HasDefaultValue(false)
                                .HasColumnName("Gross");

                            b1.Property<int?>("To")
                                .HasColumnType("integer")
                                .HasColumnName("To");

                            b1.HasKey("VacancyId");

                            b1.ToTable("Vacancy");

                            b1.WithOwner()
                                .HasForeignKey("VacancyId");
                        });

                    b.Navigation("Address");

                    b.Navigation("Area");

                    b.Navigation("Employer");

                    b.Navigation("Employment");

                    b.Navigation("Experience");

                    b.Navigation("Salary");

                    b.Navigation("Schedule");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("ProfessionalRoleVacancy", b =>
                {
                    b.HasOne("ParsingService.Domain.Entities.Models.ProfessionalRole", null)
                        .WithMany()
                        .HasForeignKey("ProfessionalRolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ParsingService.Domain.Entities.Models.Vacancy", null)
                        .WithMany()
                        .HasForeignKey("VacancyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.Area", b =>
                {
                    b.Navigation("Areas");

                    b.Navigation("Lines");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.MetroLine", b =>
                {
                    b.Navigation("Stations");
                });

            modelBuilder.Entity("ParsingService.Domain.Entities.Models.ProfessionalRole", b =>
                {
                    b.Navigation("Roles");
                });
#pragma warning restore 612, 618
        }
    }
}