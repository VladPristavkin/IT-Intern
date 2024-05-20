using AutoMapper;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Entities.Models;
using Type = VacancyService.Domain.Entities.Models.Type;

namespace VacancyService.Application.Common.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<AddressForCreationDto,  AddressDto>().ReverseMap();
            CreateMap<AddressForCreationDto, Address>().ReverseMap();

            CreateMap<Area, AreaDto>().ReverseMap();
            CreateMap<Area,AreaForVacancyDto>().ReverseMap();

            CreateMap<Employer, EmployerDto>().ReverseMap();
            CreateMap<EmployerForCreationDto, Employer>().ReverseMap();
            CreateMap<EmployerForCreationDto, EmployerDto>().ReverseMap();

            CreateMap<Employment, EmploymentDto>().ReverseMap();

            CreateMap<Experience, ExperienceDto>().ReverseMap();

            CreateMap<KeySkill, KeySkillDto>().ReverseMap();

            CreateMap<Language, LanguageDto>().ReverseMap();

            CreateMap<Level, LevelDto>().ReverseMap();

            CreateMap<MetroLine, MetroLineDto>().ReverseMap();

            CreateMap<MetroStation, MetroStationDto>().ReverseMap();

            CreateMap<ProfessionalRole, ProfessionalRoleDto>().ReverseMap();

            CreateMap<Salary, SalaryDto>().ReverseMap();

            CreateMap<Schedule, ScheduleDto>().ReverseMap();

            CreateMap<Type, TypeDto>().ReverseMap();

            CreateMap<Vacancy, VacancyDto>().ReverseMap();
            CreateMap<VacancyForCreationDto, Vacancy>().ReverseMap();
            CreateMap<VacancyForCreationDto, VacancyDto>().ReverseMap();
        }
    }
}
