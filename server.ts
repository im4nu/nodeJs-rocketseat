import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { GetCourseByIdRoute } from "./src/routes/get-course-by-id";
import { GetAllCoursesRoute } from "./src/routes/get-all-courses";
import { CreateCourseRoute } from "./src/routes/create-course";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

// Swagger
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Desafio de nodeJs rocketseat",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.setValidatorCompiler(validatorCompiler); // Valida a entrada
server.setSerializerCompiler(serializerCompiler); // Transorma a saída

// Rotas
server.register(GetCourseByIdRoute);
server.register(GetAllCoursesRoute);
server.register(CreateCourseRoute);

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
