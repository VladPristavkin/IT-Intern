using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public interface IMetroRepository
    {
        public bool IsFull { get; }
        public Task AddMetro(IEnumerable<MetroLine> metroLines);
        public Task<IEnumerable<MetroLine>> GetAllMetroLinesAsync();
    }
}
