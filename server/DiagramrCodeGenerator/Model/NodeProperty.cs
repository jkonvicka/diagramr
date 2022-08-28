namespace DiagramrCodeGenerator.Model
{
    public class NodeProperty : ICodePart
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Visibility { get; set; }
        public string DefaultValue { get; set; }

        public string ToCode()
        {
            return $"{Visibility} {Type} {Name} {{ get; set; }} {(string.IsNullOrEmpty(DefaultValue)?string.Empty:$"= {DefaultValue}")};";
        }
    }
}
