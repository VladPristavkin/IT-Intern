using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.Vacancies.Commands.CreateVacancyCommand
{
    internal sealed class CreateVacancyCommandHandler : IRequestHandler<CreateVacancyCommand, VacancyDto>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CreateVacancyCommandHandler(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public Task<VacancyDto> Handle(CreateVacancyCommand request, CancellationToken cancellationToken)
        {
            var 
        }
    }
}
