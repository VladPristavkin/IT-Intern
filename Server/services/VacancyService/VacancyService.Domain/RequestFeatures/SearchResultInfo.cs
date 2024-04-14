using System.Text.Json.Serialization;

namespace VacancyService.Domain.RequestFeatures
{
    public class SearchResultInfo<T>
    {
        public IEnumerable<T>? Items { get; set; }
        public long Count { get; set; }
        public int Page { get; set; }
        public int Pages { get; set; }
        public int PageSize { get; set; }
    }
}
