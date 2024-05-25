using System.ComponentModel.DataAnnotations.Schema;

namespace ParsingService.Domain.Entities.Models
{
    public class Language
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public IEnumerable<Level>? Levels { get; set; }
        [NotMapped]
        public Level? Level { get; set; }
    }
}
