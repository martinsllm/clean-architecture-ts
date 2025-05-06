import { ProductRepositoryPrisma } from "../infra/repositories/product/product.repository.prisma"
import { prisma } from "../package/prisma/prisma"
import {
    CreateProductUsecase,
    DeleteProductUsecase,
    FindProductUseCase,
    ListProductUsecase,
    UpdateProductUsecase,
} from "./product"

const aRepository = ProductRepositoryPrisma.create(prisma)

const createProductUsecase = CreateProductUsecase.create(aRepository)
const listProductUsecase = ListProductUsecase.create(aRepository)
const findProductUsecase = FindProductUseCase.create(aRepository)
const updateProductUsecase = UpdateProductUsecase.create(aRepository)
const deleteProductUsecase = DeleteProductUsecase.create(aRepository)

export {
    createProductUsecase,
    listProductUsecase,
    findProductUsecase,
    updateProductUsecase,
    deleteProductUsecase,
}
