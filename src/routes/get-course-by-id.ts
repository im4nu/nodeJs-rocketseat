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
        params: z.object({
          id: z.uuid(),
        }),
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
