using DiagramrCodeGenerator.BusinessLogic.GenerateCode;
using DiagramrCodeGenerator.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace DiagramrCodeGenerator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenerateCodeController : ControllerBase
    {
        private readonly ILogger<GenerateCodeController> _logger;

        public GenerateCodeController(ILogger<GenerateCodeController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "GenerateCode")]
        public string GenerateCode(ClassDiagram classDiagram)
        {
            var cd = new ClassDiagram();


            cd.Language = "C#";
            cd.Nodes = new List<Node>()
            {
                new Node()
                {
                    Key = 1,
                    Name = "BankAccount",
                    Methods = new List<NodeMethod>()
                    {
                        new NodeMethod()
                        {
                            Name = "Pay",
                            Visibility = "public",
                            Parameters = new List<NodeMethodParameter>()
                            {
                                new NodeMethodParameter()
                                {
                                    Name = "amount",
                                    Type = "long"
                                },
                                new NodeMethodParameter()
                                {
                                    Name = "isApproved",
                                    Type = "bool"
                                }
                            }
                        }
                    }
                }
            };


            string cdgResult = CodeGenerator.Instance.Generate(cd);
            return cdgResult;
            /*string filePath = @"C:\Users\root\personal\files.zip";

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType, Path.GetFileName(filePath));*/
        }
    }
}
