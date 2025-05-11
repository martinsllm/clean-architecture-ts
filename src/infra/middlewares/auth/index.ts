import { prisma } from "../../../package/prisma/prisma"
import { UserRepositoryPrisma } from "../../repositories/user/user.repository.prisma"
import { AuthMiddleware } from "./auth.middleware"

const aUserRepository = UserRepositoryPrisma.create(prisma)

const auth = AuthMiddleware.create(aUserRepository)

export { auth }
