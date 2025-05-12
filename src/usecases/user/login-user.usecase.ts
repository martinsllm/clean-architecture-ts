import { User } from "../../domain/user/entity/user"
import { UserInterface } from "../../domain/user/interface/user.interface"
import { BadRequestError } from "../../infra/middlewares/errors/helpers/api-errors"
import { Usecase } from "../usecases"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export type LoginUserInputDto = {
    email: string
    password: string
}

export type LoginUserOutputDto = {
    id: string
    token: string
}

export class LoginUserUsecase
    implements Usecase<LoginUserInputDto, LoginUserOutputDto>
{
    private constructor(private readonly userInterface: UserInterface) {}

    public static create(userInterface: UserInterface) {
        return new LoginUserUsecase(userInterface)
    }

    public async execute(
        input: LoginUserInputDto
    ): Promise<LoginUserOutputDto> {
        const aProduct = await this.userInterface.findByEmail(input.email)

        const verifyPass = await bcrypt.compare(
            input.password,
            aProduct.password
        )
        if (!verifyPass)
            throw new BadRequestError("Invalid e-mail or password!")

        const output = this.presentOutput(aProduct)

        return output
    }

    private presentOutput(user: User) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
            expiresIn: "8h",
        })

        return {
            id: user.id,
            token,
        }
    }
}
