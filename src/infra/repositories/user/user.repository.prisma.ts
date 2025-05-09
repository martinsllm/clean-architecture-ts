import { PrismaClient } from "@prisma/client"
import { User } from "../../../domain/user/entity/user"
import { UserInterface } from "../../../domain/user/interface/user.interface"
import bcrypt from "bcrypt"
import { BadRequestError } from "../../middlewares/helpers/api-errors"

export class UserRepositoryPrisma implements UserInterface {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient)
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
        }

        const hashPassword = await bcrypt.hash(data.password, 10)

        await this.prismaClient.user.create({
            data: {
                ...data,
                password: hashPassword,
            },
        })
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await this.prismaClient.user.findFirst({
            where: {
                email,
            },
        })

        if (!user) throw new BadRequestError("Invalid e-mail or password!")

        const userData = User.with({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        })

        return userData
    }
}
