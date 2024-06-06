import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "At least 6 character"),
});
