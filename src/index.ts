import { ApiExpress } from "./infra/api/express/api.express"
import {
    CreateProductRoute,
    FindProductRoute,
    ListProductRoute,
} from "./infra/api/express/routes/product"
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma"
import { prisma } from "./package/prisma/prisma"
import {
    ListProductUsecase,
    CreateProductUsecase,
    FindProductUseCase,
} from "./usecases/product"

function main() {
    const aRepository = ProductRepositoryPrisma.create(prisma)

    const createProductUsecase = CreateProductUsecase.create(aRepository)
    const listProductUsecase = ListProductUsecase.create(aRepository)
    const findProductUseCase = FindProductUseCase.create(aRepository)

    const createRoute = CreateProductRoute.create(createProductUsecase)
    const listRoute = ListProductRoute.create(listProductUsecase)
    const findRoute = FindProductRoute.create(findProductUseCase)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([createRoute, listRoute, findRoute])

    api.start(port)
}

main()
