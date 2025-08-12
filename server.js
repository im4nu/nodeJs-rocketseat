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

server.post("/courses", () => {
  courses.push({ id: crypto.randomUUID, title: "Novo curso" });
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
