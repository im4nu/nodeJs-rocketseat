import z from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const CreateCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/createCourse",
    {
      schema: {
        body: z.object({
          title: z.string().min(4, "Título precisa ter no mínimo 4 caracteres"),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const result = await db
        .insert(courses)
        .values({
          title: request.body.title,
          description: request.body.description,
        })
        .returning();

      return reply.send({ courseId: result[0].id });
    }
  );
};
