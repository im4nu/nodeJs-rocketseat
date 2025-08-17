import z from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const CreateCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/createCourse",
    {
      schema: {
        tags: ["courses"],
        summary: "Create a course",
        description:
          "This route add on database a course you send, but title is required and must have at least 4 charactes",
        body: z.object({
          title: z.string().min(4, "Título precisa ter no mínimo 4 caracteres"),
          description: z.string().optional(),
        }),
        response: {
          201: z
            .object({ courseId: z.uuid() })
            .describe("Curso criado com sucesso!"),
        },
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
