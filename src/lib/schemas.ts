import { z } from "zod";

export const ThreadCreateSchema = z.object({
  title: z.string().trim().min(1).max(100),
  tweets: z.array(
    z.object({
      content: z.string().trim().min(1),
    })
  ),
});
