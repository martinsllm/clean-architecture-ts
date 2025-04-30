import { Request, Response } from "express"
import { HttpMethod, Route } from "../routes"
import {
    FindProductInputDto,
    FindProductOutputDto,
    FindProductUseCase,
} from "../../../../../usecases/product"

export type FindProductResponseDto = {
    product: {
        id: string
        name: string
        price: number
        quantity: number
    }
}

export class FindProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findProductService: FindProductUseCase
    ) {}

    public static create(findProductService: FindProductUseCase) {
        return new FindProductRoute(
            "/product/:id",
            HttpMethod.GET,
            findProductService
        )
    }

    getHandler() {
        return async (req: Request, res: Response) => {
            const { id } = req.params

            const input: FindProductInputDto = {
                id,
            }

            const output = await this.findProductService.execute(input)

            const responseBody = this.present(output)

            res.status(200).json(responseBody).send()
        }
    }

    getPath(): string {
        return this.path
    }

    getMethod(): HttpMethod {
        return this.method
    }

    private present(input: FindProductOutputDto): FindProductResponseDto {
        const response: FindProductResponseDto = {
            product: {
                id: input.id,
                name: input.name,
                price: input.price,
                quantity: input.quantity,
            },
        }

        return response
    }
}
