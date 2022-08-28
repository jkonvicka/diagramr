using DiagramrCodeGenerator.Model;
using System.Text;

namespace DiagramrCodeGenerator.BusinessLogic.GenerateCode
{
    public sealed class CodeGenerator
    {
        private static CodeGenerator? instance = null;
        private static readonly object padlock = new object();
        //private ClassDiagram classDiagram;


        private CodeGenerator()
        {
        }

        public static CodeGenerator Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new CodeGenerator();
                    }
                    return instance;
                }
            }
        }

        public string Generate(ClassDiagram classDiagram)
        {
            return classDiagram.ToCode();
        }
    }
}
