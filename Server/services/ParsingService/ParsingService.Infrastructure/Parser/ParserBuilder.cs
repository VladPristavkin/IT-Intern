using Microsoft.Extensions.Configuration;

namespace JobSearchAssistant.BL.Parser
{
    public class ParserBuilder
    {
        private ParserOptions parserOptions { get; set; }

        public ParserBuilder AddParsingConfig(string path)
        {
            try
            {
                parserOptions.Configuration = new ConfigurationBuilder()
                    .AddJsonFile(path, optional: true, reloadOnChange: true)
                    .Build();

                parserOptions.PathForConfigFile = path;

                return this;
            }
            catch (FileNotFoundException)
            {
                return null;
            }
            catch
            {
                return null;
            }
        }

        public ParserBuilder AddTypeOfParser(Type type)
        {
            if (typeof(IParser).IsAssignableFrom(type))
            {
                parserOptions.TypeOfParser = type;
                var nameOfParser = type.Name.Split("Parser")[0].ToLower();
                try
                {
                    parserOptions.TypeInConfig = parserOptions.Configuration.GetSection("types").GetChildren().First(item => item.Value.ToLower() == nameOfParser).Value;
                    parserOptions.BaseUrl = parserOptions["base_api_urls"];
                }
                catch
                {
                    throw new Exception("ParserBuilder.AddTypeOfParser");
                }
                return this;
            }
            else
            {
                throw new InvalidOperationException();
            }
        }

        public ParserBuilder MergeParametersTo_1()
        {
            ParameterHelper.AddFrom_3To_1(parserOptions.Parameters_1, parserOptions.Parameters_3);
            ParameterHelper.AddFrom_2To_1(parserOptions.Parameters_1, parserOptions.Parameters_2);

            return this;
        }

        public ParserBuilder AddParsingParametrs()
        {
            if (!File.Exists(parserOptions["path_for_source_files"]))
            {
                throw new Exception("File is absent.");
            }

            IConfiguration configuration = new ConfigurationBuilder()
                 .AddJsonFile(parserOptions["path_for_source_files"], optional: true, reloadOnChange: true)
                 .Build();

            AddParametrs(configuration, "_1");
            AddParametrs(configuration, "_2");
            AddParametrs(configuration, "_3");

            return this;
        }

        public ParserBuilder AddLinks()
        {
            //ToDo: добавить для яндекс

            return this;
        }

        public IParser Build()
        {
            var parser = (Activator.CreateInstance(parserOptions.TypeOfParser) as IParser) ?? throw new Exception("This type does not implement the interface IParser.");
            parser.Urls = parserOptions.Urls as List<string> ?? new List<string>();
            parser.baseUrl = parserOptions.BaseUrl ?? throw new Exception();
            parser.Parameters_1 = parserOptions.Parameters_1;
            parser.Parameters_2 = parserOptions.Parameters_2;
            parser.Parameters_3 = parserOptions.Parameters_3;
            return parser;
        }

        public ParserBuilder()
        {
            parserOptions = new ParserOptions();
        }

        private void AddParametrs(IConfiguration configuration, string key)
        {
            var sections = configuration.GetChildren()
              .Where(c => c.Key.EndsWith(key))
              .ToList();

            switch (key)
            {
                case "_1":

                    foreach (var section in sections)
                    {
                        var list = new List<string>();
                        foreach (var element in section.GetChildren())
                        {
                            list.Add(element.Value);
                        };

                        parserOptions.Parameters_1.Add(section.Key.Split("_1")[0], list);
                    }

                    break;

                case "_2":
                    int i = 0;
                    foreach (var section in sections)
                    {
                        var dictionary = new Dictionary<string, IList<string>>();

                        foreach (var element in section.GetChildren())
                        {
                            var list = new List<string>();

                            foreach (var item in element.GetSection(section.Key.Split("_2")[0]).GetChildren())
                            {
                                list.Add(item.Value);
                            }

                            dictionary.Add(section.Key.Split("_2")[0] + i.ToString(), list);
                            i++;
                        }
                        parserOptions.Parameters_2.Add(section.Key.Split("_2")[0], dictionary);
                    }

                    break;

                case "_3":
                    break;
            }
        }
    }
}
