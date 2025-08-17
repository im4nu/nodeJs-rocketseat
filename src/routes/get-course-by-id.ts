import z from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";
import { eq } from "drizzle-orm";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const GetCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/getCourseById/:id",
    {
      schema: {
        tags: ["courses"],
        summary: "Get course by id",
        description:
          "This route get first course on database with the same UUID you send",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }),
          }),
          404: z.null().describe("Course not found"),
        },
      },
    },
    async (request, reply) => {
      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, request.params.id))
        .limit(1);

      if (result.length > 0) {
        return { course: result[0] };
      }
    }
  );
};
