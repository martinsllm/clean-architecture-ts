import { z } from "zod"
import { UpdateProductSchema } from "../validation/product.schema"
import { ProductInterface } from "../../domain/product/interface/product.interface"
import { Product } from "../../domain/product/entity/product"
import { Usecase } from "../usecases"

export type UpdateProductInputDto = z.infer<typeof UpdateProductSchema>

export type UpdateProductOutputDto = void

export class UpdateProductUsecase
    implements Usecase<UpdateProductInputDto, UpdateProductOutputDto>
{
    private constructor(private readonly productInterface: ProductInterface) {}

    public static create(productInterface: ProductInterface) {
        return new UpdateProductUsecase(productInterface)
    }

    public async execute(
        input: UpdateProductInputDto
    ): Promise<UpdateProductOutputDto> {
        UpdateProductSchema.parse(input)

        await this.productInterface.findById(input.id)

        const aProduct = Product.with({
            id: input.id,
            name: input.name,
            price: input.price,
            quantity: input.quantity,
        })

        await this.productInterface.update(input.id, aProduct)
    }
}
