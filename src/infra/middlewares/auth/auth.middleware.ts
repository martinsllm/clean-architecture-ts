import { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../errors/api-errors"
import { Auth } from "./auth.interface"
import { UserInterface } from "../../../domain/user/interface/user.interface"

export class AuthMiddleware implements Auth {
    private constructor(private readonly userInterface: UserInterface) {}

    public static create(userInterface: UserInterface) {
        return new AuthMiddleware(userInterface)
    }

    public getAuth() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { authorization } = req.headers
            if (!authorization) throw new UnauthorizedError("Unauthorized!")

            next()
        }
    }
}
