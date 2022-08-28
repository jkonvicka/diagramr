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
            sb.Append($"{Visibility} {Name}(");
            sb.Append(String.Join($", ", Parameters.Select(x => x.ToCode())));
            sb.Append(")\n");
            return sb.ToString();
        }
    }
}
