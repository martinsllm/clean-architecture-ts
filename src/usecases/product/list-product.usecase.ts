import { Product } from "../../domain/product/entity/product";
import { ProductInterface } from "../../domain/product/interface/product.interface";
import { Usecase } from "../usecases";

export type ListProductInputDto = void

export type ListProductOutputDto = {
    products: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
}

export class ListProductUsecase 
    implements Usecase<ListProductInputDto, ListProductOutputDto> 
{
    private constructor(private readonly productInterface: ProductInterface) {}

    public static create(productInterface: ProductInterface) {
        return new ListProductUsecase(productInterface)
    }

    public async execute(): Promise<ListProductOutputDto> {
        const aProducts = await this.productInterface.list()

        const output = this.presentOutput(aProducts)

        return output
    }

    private presentOutput(products: Product[]): ListProductOutputDto {
        return {
            products: products.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                }
            }),
        }
    }
}