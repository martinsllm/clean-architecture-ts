import { ProductRepositoryPrisma } from "../infra/repositories/product/product.repository.prisma"
import { prisma } from "../package/prisma/prisma"
import {
    CreateProductUsecase,
    DeleteProductUsecase,
    FindProductUseCase,
    ListProductUsecase,
    UpdateProductUsecase,
} from "./product"
import { CreateUserUsecase } from "./user/create-user.usecase"

const aProductRepository = ProductRepositoryPrisma.create(prisma)

const createProductUsecase = CreateProductUsecase.create(aProductRepository)
const listProductUsecase = ListProductUsecase.create(aProductRepository)
const findProductUsecase = FindProductUseCase.create(aProductRepository)
const updateProductUsecase = UpdateProductUsecase.create(aProductRepository)
const deleteProductUsecase = DeleteProductUsecase.create(aProductRepository)
const createUserUsecase = CreateUserUsecase.create()

export {
    createProductUsecase,
    listProductUsecase,
    findProductUsecase,
    updateProductUsecase,
    deleteProductUsecase,
    createUserUsecase,
}
