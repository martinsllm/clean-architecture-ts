import { Api } from "../api"
import express, { Express } from "express"
import { Route } from "./routes/routes"
import { auth } from "../../middlewares/auth"
import { errorMiddleware } from "../../middlewares/errors/error.middleware"

export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express()
        this.app.use(express.json())
        this.addRoutes(routes)
        this.app.use(errorMiddleware)
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes)
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()

            if (path != "/users" && path != "/login") {
                const middleware = auth.getAuth()
                this.app[method](path, middleware, handler)
            }

            this.app[method](path, handler)
        })
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    }
}
