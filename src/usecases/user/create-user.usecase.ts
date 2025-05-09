import { z } from "zod"
import { UserInterface } from "../../domain/user/interface/user.interface"
import { CreateUserSchema } from "../validation/user.schema"
import { Usecase } from "../usecases"
import { User } from "../../domain/user/entity/user"

export type CreateUserInputDto = z.infer<typeof CreateUserSchema>

export type CreateUserOutputDto = {
    id: string
}

export class CreateUserUsecase
    implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
    private constructor(private readonly userInterface: UserInterface) {}

    public static create(userInterface: UserInterface) {
        return new CreateUserUsecase(userInterface)
    }

    public async execute(
        input: CreateUserInputDto
    ): Promise<CreateUserOutputDto> {
        CreateUserSchema.parse(input)

        const aUser = User.create(input.name, input.email, input.password)

        await this.userInterface.save(aUser)

        const output = this.presentOutput(aUser)

        return output
    }

    private presentOutput(user: User) {
        const output: CreateUserOutputDto = {
            id: user.id,
        }

        return output
    }
}
