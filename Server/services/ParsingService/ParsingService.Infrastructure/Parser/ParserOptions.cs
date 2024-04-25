using Microsoft.Extensions.Configuration;

namespace JobSearchAssistant.BL.Parser
{
    public class ParserOptions
    {
        public string this[string section]
        {
            get
            {
                return Configuration.GetSection(section)[TypeInConfig] ?? throw new Exception($"Component {section} not fount.");
            }
        }

        public IDictionary<string, IList<string>> Parameters_1 { get; set; }

        public IDictionary<string, IDictionary<string, IList<string>>> Parameters_2 { get; set; }

        public IDictionary<string, IDictionary<string, IDictionary<string, IList<string>>>> Parameters_3 { get; set; }

        public string PathForConfigFile { get; set; }

        public string TypeInConfig { get; set; }

        public string BaseUrl { get; set; }

        public IConfiguration Configuration { get; set; }

        public IEnumerable<string> Urls { get; set; }

        public Type TypeOfParser { get; set; }

        public ParserOptions()
        {
            Parameters_1 = new Dictionary<string, IList<string>>();
            Parameters_2 = new Dictionary<string, IDictionary<string, IList<string>>>();
            Parameters_3 = new Dictionary<string, IDictionary<string, IDictionary<string, IList<string>>>>();
        }
    }
}
