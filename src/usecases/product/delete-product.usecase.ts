import { ProductInterface } from "../../domain/product/interface/product.interface"
import { Usecase } from "../usecases"

export type DeleteProductInputDto = {
    id: string
}

export type DeleteProductOutputDto = void

export class DeleteProductUsecase
    implements Usecase<DeleteProductInputDto, DeleteProductOutputDto>
{
    private constructor(private readonly productInterface: ProductInterface) {}

    public static create(productInterface: ProductInterface) {
        return new DeleteProductUsecase(productInterface)
    }

    public async execute(
        input: DeleteProductInputDto
    ): Promise<DeleteProductOutputDto> {
        await this.productInterface.findById(input.id)

        await this.productInterface.delete(input.id)
    }
}
