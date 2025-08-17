import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client";
import { courses } from "../database/schema";
import z from "zod";

export const GetAllCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/getAllCourses",
    {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        description: "This route list all courses from database",
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                description: z.string().optional(),
              })
            ),
          }),
        },
      },
    },
    async (reques, reply) => {
      const result = await db
        .select({
          id: courses.id,
          title: courses.title,
        })
        .from(courses);

      return reply.send({ courses: result });
    }
  );
};
