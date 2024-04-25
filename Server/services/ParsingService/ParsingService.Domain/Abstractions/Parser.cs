using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public abstract class Parser
    {
        protected abstract string BaseUri { get; set; }

        public abstract IEnumerable<Vacancy> Parse();
    }
}
