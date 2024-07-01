import { Express, Response, Request } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { readFileSync } from "fs";
import { join } from "path";
const packageJson = JSON.parse(readFileSync(join(__dirname, "../../package.json"), "utf8"));
const version = packageJson.version;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Doc for MyEvents",
      version,
      description: "This is the temporary swagger of MyEvent. Some endpoints are pending changes.",
      contact: {
        email: "risbel961019@gmail.com",
        name: "Risbel Suárez",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:4000/",
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: any) {
  //Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //Docs in json format
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "aplication/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available in http://localhost:${port}/docs`);
}

export default swaggerDocs;
