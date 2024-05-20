namespace ParsingService.Application.Common.Helpers
{
    public static class ParameterHelper
    {
        public static void MovingByPriorityArray<T>(ref IDictionary<string, T> Parameters, string[] priorityArray)
        {
            ArgumentNullException.ThrowIfNull(Parameters);
            ArgumentNullException.ThrowIfNull(priorityArray);

            var orderedParameters = new Dictionary<string, T>();
            var otherParameters = new Dictionary<string, T>();

            foreach (var key in priorityArray)
            {
                if (Parameters.TryGetValue(key, out T value))
                {
                    orderedParameters[key] = value;
                }
                Parameters.Remove(key);
            }

            foreach (var parameter in Parameters)
            {
                otherParameters.Add(parameter.Key, parameter.Value);
            }

            Parameters = orderedParameters;

            foreach (var parameter in otherParameters)
            {
                Parameters.Add(parameter.Key, parameter.Value);
            }
        }
    }
}
