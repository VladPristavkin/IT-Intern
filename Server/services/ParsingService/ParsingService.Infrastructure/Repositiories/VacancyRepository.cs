using Dapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Npgsql;
using ParsingService.Domain.Abstractions;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Repositiories
{
    public sealed class VacancyRepository(string connectionString) : IVacancyRepository
    {
        private readonly string _dbConnectionString = connectionString;

        public async Task CreateVacancyAsync(Vacancy vacancy)
        {
            ArgumentNullException.ThrowIfNull(vacancy, nameof(vacancy));

            var Data = JsonConvert.SerializeObject(vacancy);

            const string sql = @"
            INSERT INTO Vacancies (Data)
            VALUES (@Data)";

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(sql, new
                {
                    Data = Data
                });
            }
        }

        public async Task DeleteVacancies(params Vacancy[] vacancies)
        {
            var ids = vacancies.Select(v => v.Id).ToArray();

            const string sql = @"DELETE FROM Vacancies WHERE Id = ANY(@Ids)";

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(sql, new { Ids = ids });
            }
        }

        public async Task DeleteVacancy(long id)
        {
            const string sql = @"DELETE FROM Vacancies WHERE Id = @Id";

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(sql, new { Id = id });
            }
        }


        public async Task<long> GetCount()
        {
            const string sql = @"SELECT COUNT(*) FROM Vacancies";

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();
                return await connection.ExecuteScalarAsync<long>(sql);
            }
        }

        public async Task<IEnumerable<Vacancy>> GetFirstOneHundredVacancies()
        {
            const string sql = @"SELECT Id, Data FROM Vacancies LIMIT 100";

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();

                var result = await connection.QueryAsync<VacancyData>(sql);

                var vacancies = result.Select(r =>
                {
                    var vacancy = JsonConvert.DeserializeObject<Vacancy>(r.Data);
                    vacancy.Id = r.Id;
                    return vacancy;
                }).ToList();

                return vacancies;
            }
        }

        public async Task<Vacancy> GetVacancyByIdAsync(long id)
        {
            const string sql = @"SELECT Id, Data FROM Vacancies WHERE Id = @Id";

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();
                var result = await connection.QuerySingleOrDefaultAsync<VacancyData>(sql, new { Id = id });
                return result != null ? JsonConvert.DeserializeObject<Vacancy>(result.Data) : null;
            }
        }

        public async Task UpdateVacancyAsync(Vacancy vacancy)
        {
            const string sql = @"UPDATE Vacancies SET Data = @Data WHERE Id = @Id";

            var jsonData = JsonConvert.SerializeObject(vacancy);

            using (var connection = new NpgsqlConnection(_dbConnectionString))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(sql, new { Id = vacancy.Id, Data = jsonData });
            }
        }

        private class VacancyData
        {
            public long Id { get; set; }
            public string Data { get; set; }
        }
    }
}
