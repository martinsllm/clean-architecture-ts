import { Product } from "../../domain/product/entity/product"
import { ProductInterface } from "../../domain/product/interface/product.interface"
import { Usecase } from "../usecases"

export type CreateProductInputDto = {
    name: string
    price: number
}

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
