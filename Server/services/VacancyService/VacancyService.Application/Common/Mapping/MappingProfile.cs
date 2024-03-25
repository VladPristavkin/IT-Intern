using AutoMapper;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Application.Common.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vacancy, VacancyDto>().ReverseMap();
        }
    }
}
