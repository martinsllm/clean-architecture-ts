import { Product } from "../../domain/product/entity/product"
import { ProductInterface } from "../../domain/product/interface/product.interface"
import { Usecase } from "../usecases"

export type FindProductInputDto = {
    id: string
}

export type FindProductOutputDto = {
    id: string
    name: string
    price: number
    quantity: number
}

export class FindProductUseCase
    implements Usecase<FindProductInputDto, FindProductOutputDto>
{
    private constructor(private readonly productInterface: ProductInterface) {}

    public static create(productInterface: ProductInterface) {
        return new FindProductUseCase(productInterface)
    }

    public async execute(
        input: FindProductInputDto
    ): Promise<FindProductOutputDto> {
        const aProduct = await this.productInterface.findById(input.id)

        const output = this.presentOutput(aProduct)

        return output
    }

    private presentOutput(product: Product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }
    }
}
