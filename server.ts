import fastify from "fastify";
import { createCourseBodyTypes, getCourseByIdParamType } from "./types";
import { db } from "./src/database/client";
import { courses } from "./src/database/schema";
import { eq } from "drizzle-orm";

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
});

server.get("/getAllcourses", async (reques, reply) => {
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
    })
    .from(courses);

  return reply.send({ courses: result });
});

server.post("/createCourse", async (request, reply) => {
  const body = request.body as createCourseBodyTypes;

  if (!body.title) {
    return reply.status(400).send({ message: "Título obrigatório" });
  }

  const result = await db
    .insert(courses)
    .values({
      title: body.title,
      description: body.description,
    })
    .returning();

  return reply.send({ courseId: result[0].id });
});

server.get("/getCourseById/:id", async (request, reply) => {
  const params = request.params as getCourseByIdParamType;
  const courseId = params.id;

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (result.length > 0) {
    return { course: result[0] };
  }
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
