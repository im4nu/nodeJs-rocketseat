import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client";
import { courses } from "../database/schema";

export const GetAllCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/getAllCourses", async (reques, reply) => {
    const result = await db
      .select({
        id: courses.id,
        title: courses.title,
      })
      .from(courses);

    return reply.send({ courses: result });
  });
};
