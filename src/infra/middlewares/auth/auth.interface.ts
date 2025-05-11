import { Request, Response, NextFunction } from "express"

export interface Auth {
    getAuth(): (
        request: Request,
        response: Response,
        next: NextFunction
    ) => Promise<void>
}
