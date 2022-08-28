using DiagramrCodeGenerator.Model;
using System.Text;

namespace DiagramrCodeGenerator.Utils
{
    public static class CodeExtension
    {
        private static int _indentation { get; set; }
        private static int indentation
        {
            get { return _indentation; }
            set { _indentation = (value>=0?value:0); }
        }
        public static void AppendCodeLine(this StringBuilder sb, string value)
        {
            sb.AppendLine($"{PrintIndentation()}{value}");
        }
        public static void AppendCode(this StringBuilder sb, string value)
        {
            sb.Append($"{PrintIndentation()}{value}");
        }
        private static string PrintIndentation()
        {
            var sb = new StringBuilder();
            sb.Append('\t', indentation);
            return sb.ToString();
        }
        public static void IncreaseIndenation() => indentation++;
        public static void DecreaseIndenation() => indentation--;
    }
}
