namespace DiagramrCodeGenerator.Model
{
    public class Link : ICodePart
    {
        public int From { get; set; }
        public int To { get; set; }
        public string Relationship {get; set; }

        public string ToCode()
        {
            throw new NotImplementedException();
        }
    }
}
