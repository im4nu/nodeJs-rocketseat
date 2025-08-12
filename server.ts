import fastify from "fastify";
import crypto from "node:crypto";
import { coursesTypes } from "./types";

const server = fastify();

const courses = [
  { id: "0", title: "Curso de node" },
  { id: "1", title: "Curso de react" },
  { id: "2", title: "Curso de php" },
];

server.get("/courses", () => {
  return courses;
});

server.post("/courses", (request, reply) => {
  const courseId = crypto.randomUUID();
  const courseTitle = request.body;

  if (!courseTitle) {
    reply.status(400).send("Título obrigatório");
  }

  courses.push({ id: courseId, title: courseTitle as string });

  return reply.status(201).send({ courseTitle });
});

server.get("/courses/:id", (request, reply) => {
  const params = request.params as coursesTypes;
  const findCourseById = courses.find((item) => item.id === params.id);

  if (findCourseById) {
    return { findCourseById };
  }

  return reply.status(404).send();
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
