using System.Text;

namespace DiagramrCodeGenerator.Model
{
    public class Node : ICodePart
    {
        public int Key { get; set; }
        public string Name { get; set; }
        public IEnumerable<NodeProperty> Properties { get; set; }
        public IEnumerable<NodeMethod> Methods { get; set; }

        public string ToCode()
        {
            var sb = new StringBuilder();
            if(Properties != null)
                sb.Append(String.Join("\n", Properties.Select(x=>x.ToCode())));
            if(Methods != null)
                sb.Append(String.Join("\n", Methods.Select(x => x.ToCode())));
            return sb.ToString();
        }
    }
}
