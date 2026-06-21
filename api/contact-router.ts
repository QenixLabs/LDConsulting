import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactRequests } from "@db/schema";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        organization: z.string().optional(),
        serviceType: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactRequests).values({
        fullName: input.fullName,
        email: input.email,
        organization: input.organization ?? null,
        serviceType: input.serviceType ?? null,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),
});
