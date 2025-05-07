import { Request, Response } from "express"
import {
    CreateUserInputDto,
    CreateUserUsecase,
} from "../../../../../usecases/user/create-user.usecase"
import { HttpMethod, Route } from "../routes"

export type CreateUserResponseDto = {
    id: string
}

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase
    ) {}

    public static create(createUserService: CreateUserUsecase) {
        return new CreateUserRoute("/users", HttpMethod.POST, createUserService)
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { name, email, password } = req.body

            const input: CreateUserInputDto = {
                name,
                email,
                password,
            }

            const output: CreateUserResponseDto =
                await this.createUserService.execute(input)

            const responseBody = this.present(output)

            res.status(201).json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: CreateUserResponseDto): CreateUserResponseDto {
        const response = { id: input.id }
        return response
    }
}
