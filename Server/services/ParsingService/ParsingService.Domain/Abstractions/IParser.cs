using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public interface IParser
    {
        protected static string OptionsForParsing { get { return "OptionsForParsing"; } }
        protected static string PathForOptionsFile { get { return "PathForOptionsFile"; } }
        protected static string BaseUri { get { return "BaseUri"; } }
        protected static string Priorities { get { return "Priorities"; } }
        public Task Parse();
    }
}
