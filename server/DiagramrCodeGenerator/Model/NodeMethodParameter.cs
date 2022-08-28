namespace DiagramrCodeGenerator.Model
{
    public class NodeMethodParameter : ICodePart
    {
        public string Name { get; set; }
        public string Type { get; set; }

        public string ToCode()
        {
            return $"{Type} {Name}";
        }
    }
}
