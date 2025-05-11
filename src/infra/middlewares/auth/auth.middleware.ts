import { Request, Response, NextFunction } from "express"
import { BadRequestError, UnauthorizedError } from "../errors/api-errors"
import { Auth } from "./auth.interface"
import { UserInterface } from "../../../domain/user/interface/user.interface"
import jwt from "jsonwebtoken"

type JwtPayload = {
    id: string
}

export class AuthMiddleware implements Auth {
    private constructor(private readonly userInterface: UserInterface) {}

    public static create(userInterface: UserInterface) {
        return new AuthMiddleware(userInterface)
    }

    public getAuth() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { authorization } = req.headers
            if (!authorization) throw new UnauthorizedError("Unauthorized!")

            const decodedToken = authorization.split(" ")[1]
            const { id } = jwt.verify(
                decodedToken,
                process.env.JWT_SECRET ?? ""
            ) as JwtPayload

            const user = await this.userInterface.findById(id)
            if (!user) throw new UnauthorizedError("Unauthorized!")

            next()
        }
    }
}
