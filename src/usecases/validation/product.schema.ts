import { z } from "zod"

export const CreateProductSchema = z.object({
    name: z.string().min(5),
    price: z.number().positive(),
})

export const UpdateProductSchema = CreateProductSchema.extend({
    id: z.string(),
    quantity: z.number().positive(),
})
