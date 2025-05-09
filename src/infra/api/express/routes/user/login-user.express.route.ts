import { Request, Response } from "express"
import { HttpMethod, Route } from "../routes"
import {
    LoginUserInputDto,
    LoginUserUsecase,
} from "../../../../../usecases/user"

export type LoginUserResponseDto = {
    id: string
    token: string
}

export class LoginUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly loginService: LoginUserUsecase
    ) {}

    public static create(loginService: LoginUserUsecase) {
        return new LoginUserRoute("/login", HttpMethod.POST, loginService)
    }

    getHandler() {
        return async (req: Request, res: Response) => {
            const { email, password } = req.body

            const input: LoginUserInputDto = {
                email,
                password,
            }

            const output: LoginUserResponseDto =
                await this.loginService.execute(input)

            res.status(200).json(output)
        }
    }

    getPath(): string {
        return this.path
    }

    getMethod(): HttpMethod {
        return this.method
    }
}
