import { Product } from "../../domain/product/entity/product"
import { ProductInterface } from "../../domain/product/interface/product.interface"
import { Usecase } from "../usecases"
import { z } from "zod"
import { CreateProductSchema } from "../validation/product.schema"

export type CreateProductInputDto = z.infer<typeof CreateProductSchema>

export type CreateProductOutputDto = {
    id: string
}

export class CreateProductUsecase
    implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
    private constructor(private readonly productInterface: ProductInterface) {}

    public static create(productInterface: ProductInterface) {
        return new CreateProductUsecase(productInterface)
    }

    public async execute(
        input: CreateProductInputDto
    ): Promise<CreateProductOutputDto> {
        CreateProductSchema.parse(input)

        const aProduct = Product.create(input.name, input.price)

        await this.productInterface.save(aProduct)

        const output = this.presentOutput(aProduct)

        return output
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        const output: CreateProductOutputDto = {
            id: product.id,
        }

        return output
    }
}
