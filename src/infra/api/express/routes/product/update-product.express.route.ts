import { NextFunction, Request, Response } from "express"
import { HttpMethod, Route } from "../routes"
import {
    UpdateProductInputDto,
    UpdateProductUsecase,
} from "../../../../../usecases/product/update-product.usecase"
import { Auth } from "../../../../middlewares/auth/auth.interface"
import { auth } from "../../../../middlewares/auth"

export class UpdateProductRoute implements Route, Auth {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateProductService: UpdateProductUsecase
    ) {}

    public static create(updateProductService: UpdateProductUsecase) {
        return new UpdateProductRoute(
            "/products/:id",
            HttpMethod.PUT,
            updateProductService
        )
    }

    public getAuth() {
        return async () => {
            auth.getAuth()
        }
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { name, price, quantity } = req.body
            const { id } = req.params

            const input: UpdateProductInputDto = {
                id,
                name,
                price,
                quantity,
            }

            await this.updateProductService.execute(input)

            res.status(204).json()
        }
    }

    getPath(): string {
        return this.path
    }

    getMethod(): HttpMethod {
        return this.method
    }
}
