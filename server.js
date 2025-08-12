const fastify = require("fastify");
const crypto = require("node:crypto");

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

  courses.push({ id: courseId, title: "Novo curso" });

  return reply.status(201).send({ courseId });
});

server.get("/courses/:id", (request, reply) => {
  const params = request.params.id;
  const findCourseById = courses.find((item) => item.id === params);

  if (findCourseById) {
    return { findCourseById };
  }

  return reply.status(404).send();
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
