namespace JobSearchAssistant.BL.Parser
{
    public static class ParameterHelper
    {
        /// <summary>
        /// Переводит все объекты структуры Parameters_3 в структуру Parameters_1 и добавляет их в Parameters_1
        /// </summary>
        /// <param name="Parameters_1"></param>
        /// <param name="Parameters_3"></param>
        public static void AddFrom_3To_1(IDictionary<string, IList<string>> Parameters_1, IDictionary<string, IDictionary<string, IDictionary<string, IList<string>>>> Parameters_3)
        {
            if (Parameters_1 == null || Parameters_3 == null)
            {
                return;
            }

            foreach (var item in Parameters_3)
            {
                var list = new List<string>();

                foreach (var subItem in item.Value)
                {
                    foreach (var subSubItem in subItem.Value)
                    {
                        foreach (var subSubSubItem in subSubItem.Value)
                        {
                            list.Add(subSubSubItem);
                        }
                    }
                }

                Parameters_1.Add(item.Key, list);
            }
        }

        /// <summary>
        /// Переводит все объекты структуры Parameters_2 в структуру Parameters_1 и добавляет их в Parameters_1
        /// </summary>
        /// <param name="Parameters_1"></param>
        /// <param name="Parameters_2"></param>
        public static void AddFrom_2To_1(IDictionary<string, IList<string>> Parameters_1, IDictionary<string, IDictionary<string, IList<string>>> Parameters_2)
        {
            if (Parameters_1 == null || Parameters_2 == null)
            {
                return;
            }

            foreach (var item in Parameters_2)
            {
                var list = new List<string>();

                foreach (var subItem in item.Value)
                {
                    foreach (var subSubItem in subItem.Value)
                    {
                        list.Add(subSubItem);
                    }
                }

                Parameters_1.Add(item.Key, list);
            }
        }

        /// <summary>
        /// Использует значения в массиве priorityArray и в соответствии значениям элементов массива меняет порядок в объекте Parameters.
        /// Сам метод возвращает false, если случилась ошибка или размер IDictionary не совпадает с priorityArray, и true в обратном случае
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Parameters"></param>
        /// <param name="priorityArray"></param>
        /// <returns></returns>
        public static bool MovingByPriorityArray<T>(ref IDictionary<string, T> Parameters, int[] priorityArray)
        {
            try
            {
                if (Parameters == null || priorityArray == null || priorityArray.Length != Parameters.Count())
                {
                    return false;
                }

                var termList = new List<object>();

                foreach (var parameter in Parameters)
                {
                    termList.Add(parameter);
                }

                var orderedParameters = priorityArray
               .Select(priority => termList[priority - 1])
               .ToList();

                Parameters = new Dictionary<string, T>();

                foreach (var item in orderedParameters)
                {
                    Parameters.Add((KeyValuePair<string, T>)item);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Использует значения в массиве priorityArray и в соответствии значениям элементов массива меняет порядок в объекте Parameters.
        /// Сам метод возвращает false, если случилась ошибка или размер IDictionary не совпадает с priorityArray, и true в обратном случае
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Parameters"></param>
        /// <param name="priorityArray"></param>
        /// <returns></returns>
        public static bool MovingByPriorityArray<T>(ref IDictionary<string, T> Parameters, string[] priorityArray)
        {
            try
            {
                if (Parameters == null || priorityArray == null || priorityArray.Length != Parameters.Count())
                {
                    return false;
                }

                var orderedParameters = new Dictionary<string, T>();

                foreach (var key in priorityArray)
                {
                    if (Parameters.TryGetValue(key, out T value))
                    {
                        orderedParameters[key] = value;
                    }
                }

                Parameters = orderedParameters;

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
