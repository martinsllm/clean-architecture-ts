import { ApiExpress } from "./infra/api/express/api.express"
import {
    CreateProductRoute,
    DeleteProductRoute,
    FindProductRoute,
    ListProductRoute,
    UpdateProductRoute,
} from "./infra/api/express/routes/product"
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma"
import { prisma } from "./package/prisma/prisma"
import {
    ListProductUsecase,
    CreateProductUsecase,
    FindProductUseCase,
    UpdateProductUsecase,
    DeleteProductUsecase,
} from "./usecases/product"

function main() {
    const aRepository = ProductRepositoryPrisma.create(prisma)

    const createProductUsecase = CreateProductUsecase.create(aRepository)
    const listProductUsecase = ListProductUsecase.create(aRepository)
    const findProductUsecase = FindProductUseCase.create(aRepository)
    const updateProductUsecase = UpdateProductUsecase.create(aRepository)
    const deleteProductUsecase = DeleteProductUsecase.create(aRepository)

    const createRoute = CreateProductRoute.create(createProductUsecase)
    const listRoute = ListProductRoute.create(listProductUsecase)
    const findRoute = FindProductRoute.create(findProductUsecase)
    const updateRoute = UpdateProductRoute.create(updateProductUsecase)
    const deleteRoute = DeleteProductRoute.create(deleteProductUsecase)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([
        createRoute,
        listRoute,
        findRoute,
        updateRoute,
        deleteRoute,
    ])

    api.start(port)
}

main()
