using DiagramrCodeGenerator.Utils;
using System.Text;

namespace DiagramrCodeGenerator.Model
{
    public class NodeMethod : ICodePart
    {
        public string Name { get; set; }
        public string Visibility { get; set; }
        public IEnumerable<NodeMethodParameter> Parameters { get; set; }

        public string ToCode()
        {
            var sb = new StringBuilder();
            sb.AppendCodeLine($"{Visibility} {Name}({String.Join($", ", Parameters.Select(x => x.ToCode()))})");
            sb.AppendCodeLine("{");
            sb.AppendCodeLine("");
            sb.AppendCodeLine("}");
            return sb.ToString();
        }
    }
}
