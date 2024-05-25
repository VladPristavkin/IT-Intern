using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ParsingService.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Building = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    Street = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Lat = table.Column<double>(type: "double precision", nullable: true),
                    Lng = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressId);
                });

            migrationBuilder.CreateTable(
                name: "Area",
                columns: table => new
                {
                    AreaId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ParentId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Area", x => x.AreaId);
                    table.ForeignKey(
                        name: "FK_Area_Area_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Area",
                        principalColumn: "AreaId");
                });

            migrationBuilder.CreateTable(
                name: "Employer",
                columns: table => new
                {
                    EmployerId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdFromBasicWebsite = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    LogoUrl = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employer", x => x.EmployerId);
                });

            migrationBuilder.CreateTable(
                name: "Employment",
                columns: table => new
                {
                    EmploymentId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employment", x => x.EmploymentId);
                });

            migrationBuilder.CreateTable(
                name: "Experience",
                columns: table => new
                {
                    ExperienceId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experience", x => x.ExperienceId);
                });

            migrationBuilder.CreateTable(
                name: "IntegrationEventLog",
                columns: table => new
                {
                    EventId = table.Column<Guid>(type: "uuid", nullable: false),
                    EventTypeName = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false),
                    TimesSent = table.Column<int>(type: "integer", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    TransactionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegrationEventLog", x => x.EventId);
                });

            migrationBuilder.CreateTable(
                name: "KeySkill",
                columns: table => new
                {
                    KeySkillId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeySkill", x => x.KeySkillId);
                });

            migrationBuilder.CreateTable(
                name: "Language",
                columns: table => new
                {
                    LanguageId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Language", x => x.LanguageId);
                });

            migrationBuilder.CreateTable(
                name: "Level",
                columns: table => new
                {
                    LevelId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Level", x => x.LevelId);
                });

            migrationBuilder.CreateTable(
                name: "ProfessionalRole",
                columns: table => new
                {
                    ProfessionalRoleId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ParentId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfessionalRole", x => x.ProfessionalRoleId);
                    table.ForeignKey(
                        name: "FK_ProfessionalRole_ProfessionalRole_ParentId",
                        column: x => x.ParentId,
                        principalTable: "ProfessionalRole",
                        principalColumn: "ProfessionalRoleId");
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    ScheduleId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.ScheduleId);
                });

            migrationBuilder.CreateTable(
                name: "Type",
                columns: table => new
                {
                    TypeId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Type", x => x.TypeId);
                });

            migrationBuilder.CreateTable(
                name: "MetroLine",
                columns: table => new
                {
                    MetrolLineId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    HexColor = table.Column<string>(type: "character varying(7)", maxLength: 7, nullable: true),
                    AreaId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetroLine", x => x.MetrolLineId);
                    table.ForeignKey(
                        name: "FK_MetroLine_Area_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Area",
                        principalColumn: "AreaId");
                });

            migrationBuilder.CreateTable(
                name: "LanguageLevel",
                columns: table => new
                {
                    LanguageId = table.Column<string>(type: "text", nullable: false),
                    LevelId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LanguageLevel", x => new { x.LanguageId, x.LevelId });
                    table.ForeignKey(
                        name: "FK_LanguageLevel_Language_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Language",
                        principalColumn: "LanguageId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LanguageLevel_Level_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Level",
                        principalColumn: "LevelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vacancy",
                columns: table => new
                {
                    VacancyId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdFromWebwite = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Archived = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    PublishedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AddressId = table.Column<long>(type: "bigint", nullable: true),
                    AreaId = table.Column<long>(type: "bigint", nullable: true),
                    EmployerId = table.Column<long>(type: "bigint", nullable: true),
                    EmploymentId = table.Column<string>(type: "text", nullable: true),
                    ExperienceId = table.Column<string>(type: "text", nullable: true),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    From = table.Column<int>(type: "integer", nullable: true),
                    To = table.Column<int>(type: "integer", nullable: true),
                    Gross = table.Column<bool>(type: "boolean", nullable: true, defaultValue: false),
                    ScheduleId = table.Column<string>(type: "text", nullable: true),
                    TypeId = table.Column<string>(type: "text", nullable: true),
                    WebsiteName = table.Column<string>(type: "text", nullable: false),
                    WebsiteLogoUrl = table.Column<string>(type: "text", nullable: false),
                    WebsiteUrl = table.Column<string>(type: "text", nullable: false),
                    OriginalVacancyUrl = table.Column<string>(type: "text", nullable: false),
                    ParsingTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vacancy", x => x.VacancyId);
                    table.ForeignKey(
                        name: "FK_Vacancy_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId");
                    table.ForeignKey(
                        name: "FK_Vacancy_Area_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Area",
                        principalColumn: "AreaId");
                    table.ForeignKey(
                        name: "FK_Vacancy_Employer_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "Employer",
                        principalColumn: "EmployerId");
                    table.ForeignKey(
                        name: "FK_Vacancy_Employment_EmploymentId",
                        column: x => x.EmploymentId,
                        principalTable: "Employment",
                        principalColumn: "EmploymentId");
                    table.ForeignKey(
                        name: "FK_Vacancy_Experience_ExperienceId",
                        column: x => x.ExperienceId,
                        principalTable: "Experience",
                        principalColumn: "ExperienceId");
                    table.ForeignKey(
                        name: "FK_Vacancy_Schedule_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "Schedule",
                        principalColumn: "ScheduleId");
                    table.ForeignKey(
                        name: "FK_Vacancy_Type_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Type",
                        principalColumn: "TypeId");
                });

            migrationBuilder.CreateTable(
                name: "MetroStation",
                columns: table => new
                {
                    MetroStationId = table.Column<double>(type: "double precision", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Lat = table.Column<double>(type: "double precision", nullable: true),
                    Lng = table.Column<double>(type: "double precision", nullable: true),
                    Order = table.Column<int>(type: "integer", nullable: true),
                    LineId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetroStation", x => x.MetroStationId);
                    table.ForeignKey(
                        name: "FK_MetroStation_MetroLine_LineId",
                        column: x => x.LineId,
                        principalTable: "MetroLine",
                        principalColumn: "MetrolLineId");
                });

            migrationBuilder.CreateTable(
                name: "KeySkillVacancy",
                columns: table => new
                {
                    KeySkillId = table.Column<string>(type: "text", nullable: false),
                    VacancyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeySkillVacancy", x => new { x.KeySkillId, x.VacancyId });
                    table.ForeignKey(
                        name: "FK_KeySkillVacancy_KeySkill_KeySkillId",
                        column: x => x.KeySkillId,
                        principalTable: "KeySkill",
                        principalColumn: "KeySkillId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KeySkillVacancy_Vacancy_VacancyId",
                        column: x => x.VacancyId,
                        principalTable: "Vacancy",
                        principalColumn: "VacancyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LanguageVacancy",
                columns: table => new
                {
                    LanguagesId = table.Column<string>(type: "text", nullable: false),
                    VacancyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LanguageVacancy", x => new { x.LanguagesId, x.VacancyId });
                    table.ForeignKey(
                        name: "FK_LanguageVacancy_Language_LanguagesId",
                        column: x => x.LanguagesId,
                        principalTable: "Language",
                        principalColumn: "LanguageId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LanguageVacancy_Vacancy_VacancyId",
                        column: x => x.VacancyId,
                        principalTable: "Vacancy",
                        principalColumn: "VacancyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProfessionalRoleVacancy",
                columns: table => new
                {
                    ProfessionalRolesId = table.Column<long>(type: "bigint", nullable: false),
                    VacancyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfessionalRoleVacancy", x => new { x.ProfessionalRolesId, x.VacancyId });
                    table.ForeignKey(
                        name: "FK_ProfessionalRoleVacancy_ProfessionalRole_ProfessionalRolesId",
                        column: x => x.ProfessionalRolesId,
                        principalTable: "ProfessionalRole",
                        principalColumn: "ProfessionalRoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProfessionalRoleVacancy_Vacancy_VacancyId",
                        column: x => x.VacancyId,
                        principalTable: "Vacancy",
                        principalColumn: "VacancyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AddressMetroStation",
                columns: table => new
                {
                    AddressId = table.Column<long>(type: "bigint", nullable: false),
                    MetroStationId = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddressMetroStation", x => new { x.AddressId, x.MetroStationId });
                    table.ForeignKey(
                        name: "FK_AddressMetroStation_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AddressMetroStation_MetroStation_MetroStationId",
                        column: x => x.MetroStationId,
                        principalTable: "MetroStation",
                        principalColumn: "MetroStationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_AddressId",
                table: "Address",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AddressMetroStation_MetroStationId",
                table: "AddressMetroStation",
                column: "MetroStationId");

            migrationBuilder.CreateIndex(
                name: "IX_Area_AreaId",
                table: "Area",
                column: "AreaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Area_ParentId",
                table: "Area",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Employer_EmployerId",
                table: "Employer",
                column: "EmployerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employment_EmploymentId",
                table: "Employment",
                column: "EmploymentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Experience_ExperienceId",
                table: "Experience",
                column: "ExperienceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KeySkill_KeySkillId",
                table: "KeySkill",
                column: "KeySkillId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KeySkillVacancy_VacancyId",
                table: "KeySkillVacancy",
                column: "VacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_Language_LanguageId",
                table: "Language",
                column: "LanguageId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LanguageLevel_LevelId",
                table: "LanguageLevel",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_LanguageVacancy_VacancyId",
                table: "LanguageVacancy",
                column: "VacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_Level_LevelId",
                table: "Level",
                column: "LevelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MetroLine_AreaId",
                table: "MetroLine",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_MetroLine_MetrolLineId",
                table: "MetroLine",
                column: "MetrolLineId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MetroStation_LineId",
                table: "MetroStation",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_MetroStation_MetroStationId",
                table: "MetroStation",
                column: "MetroStationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfessionalRole_ParentId",
                table: "ProfessionalRole",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfessionalRole_ProfessionalRoleId",
                table: "ProfessionalRole",
                column: "ProfessionalRoleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfessionalRoleVacancy_VacancyId",
                table: "ProfessionalRoleVacancy",
                column: "VacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_ScheduleId",
                table: "Schedule",
                column: "ScheduleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Type_TypeId",
                table: "Type",
                column: "TypeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_AddressId",
                table: "Vacancy",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_AreaId",
                table: "Vacancy",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_EmployerId",
                table: "Vacancy",
                column: "EmployerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_EmploymentId",
                table: "Vacancy",
                column: "EmploymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_ExperienceId",
                table: "Vacancy",
                column: "ExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_ScheduleId",
                table: "Vacancy",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_TypeId",
                table: "Vacancy",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancy_VacancyId",
                table: "Vacancy",
                column: "VacancyId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddressMetroStation");

            migrationBuilder.DropTable(
                name: "IntegrationEventLog");

            migrationBuilder.DropTable(
                name: "KeySkillVacancy");

            migrationBuilder.DropTable(
                name: "LanguageLevel");

            migrationBuilder.DropTable(
                name: "LanguageVacancy");

            migrationBuilder.DropTable(
                name: "ProfessionalRoleVacancy");

            migrationBuilder.DropTable(
                name: "MetroStation");

            migrationBuilder.DropTable(
                name: "KeySkill");

            migrationBuilder.DropTable(
                name: "Level");

            migrationBuilder.DropTable(
                name: "Language");

            migrationBuilder.DropTable(
                name: "ProfessionalRole");

            migrationBuilder.DropTable(
                name: "Vacancy");

            migrationBuilder.DropTable(
                name: "MetroLine");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Employer");

            migrationBuilder.DropTable(
                name: "Employment");

            migrationBuilder.DropTable(
                name: "Experience");

            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropTable(
                name: "Type");

            migrationBuilder.DropTable(
                name: "Area");
        }
    }
}
