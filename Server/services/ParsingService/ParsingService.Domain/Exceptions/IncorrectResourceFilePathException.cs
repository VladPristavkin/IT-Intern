namespace ParsingService.Domain.Entities.Exceptions
{
    public class IncorrectResourceFilePathException : Exception
    {
        public override string Message => "Incorrect path for resource in appsettings.json";
    }
}
