namespace DiagramrCodeGenerator.Model
{
    public class ClassDiagram : ICodePart
    {
        public string Language { get; set; } = "C#";
        public IEnumerable<Node> Nodes { get; set; }
        public IEnumerable<Link> Links { get; set; }

        public string ToCode()
        {
            return String.Join("\n", Nodes.Select(x => x.ToCode()));
        }
    }
}
