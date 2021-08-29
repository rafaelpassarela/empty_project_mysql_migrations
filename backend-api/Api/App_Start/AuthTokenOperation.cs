using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Web.Http.Description;

namespace Api.App_Start
{
    public class AuthTokenOperation : IDocumentFilter
    {
        public void Apply(SwaggerDocument swaggerDoc, SchemaRegistry schemaRegistry, IApiExplorer apiExplorer)
        {
            swaggerDoc.definitions.Add("TokenResult", new Schema
            {
                type = "object",
                properties = new Dictionary<string, Schema>
                {
                    {"access_token", new Schema { type = "string" } },
                    {"token_type", new Schema { type = "string", @default = "bearer" } },
                    {"expires_in", new Schema { type = "integer", format = "int32" } },
                    {"userName", new Schema { type = "string" } },
                    {".issued", new Schema { type = "string" } },
                    {".expires", new Schema { type = "string" } }
                }
            });
            swaggerDoc.paths.Add("/api/token", new PathItem
            {
                post = new Operation
                {
                    tags = new List<string> { "Auth" },
                    consumes = new List<string>
                    {
                        "application/x-www-form-urlencoded"
                    },
                    parameters = new List<Parameter>
                    {
                        new Parameter
                        {
                            type = "string",
                            name = "grant_type",
                            required = true,
                            @in = "formData",
                            @default = "password"
                        },
                        new Parameter
                        {
                            type = "string",
                            name = "username",
                            required = false,
                            @in = "formData"
                        },
                        new Parameter
                        {
                            type = "string",
                            name = "password",
                            required = false,
                            @in = "formData"
                        }
                    },
                    responses = new Dictionary<string, Response>
                    {
                        { "200", new Response
                            {
                                description = "OK",
                                schema = new Schema
                                {
                                    type = "object",
                                    @ref = "#/definitions/TokenResult"
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}