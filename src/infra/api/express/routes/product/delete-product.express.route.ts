import { NextFunction, Request, Response } from "express"
import { HttpMethod, Route } from "../routes"
import {
    DeleteProductInputDto,
    DeleteProductUsecase,
} from "../../../../../usecases/product"
import { Auth } from "../../../../middlewares/auth/auth.interface"
import { auth } from "../../../../middlewares/auth"

export class DeleteProductRoute implements Route, Auth {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteProductService: DeleteProductUsecase
    ) {}

    public static create(deleteProductService: DeleteProductUsecase) {
        return new DeleteProductRoute(
            "/products/:id",
            HttpMethod.DELETE,
            deleteProductService
        )
    }

    public getAuth() {
        return async () => {
            auth.getAuth()
        }
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { id } = req.params

            const input: DeleteProductInputDto = {
                id,
            }

            await this.deleteProductService.execute(input)

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
