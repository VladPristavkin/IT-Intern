using VacancyService.Domain.Enums;

namespace VacancyService.Domain.RequestFeatures
{
    public abstract class RequestParameters
    {
        private const int _maxPageSize = 50;
        private int _pageSize = 10;

        public int Page { get; set; } = 1;

        public int PageSize
        {
            get { return _pageSize; }
            set
            {
                _pageSize = (value > _maxPageSize) ? _maxPageSize : value;
            }
        }

        public OrderBy OrderBy { get; set; }
        public SearchPeriod SearchPeriod { get; set; }
    }
}
