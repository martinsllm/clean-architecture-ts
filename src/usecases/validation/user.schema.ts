import { z } from "zod"

export const CreateUserSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
})
