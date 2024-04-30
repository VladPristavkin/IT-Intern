using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public interface IParser
    {
        protected static string ResourceFiles { get { return "ResourceFilesPaths"; } }
        public Task Parse();
    }
}
