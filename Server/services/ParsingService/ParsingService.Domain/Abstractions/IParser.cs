using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public interface IParser
    {
        protected abstract string BaseUri { get; set; }

        public Task Parse();
    }
}
