import {
    createProductUsecase,
    createUserUsecase,
    deleteProductUsecase,
    findProductUsecase,
    listProductUsecase,
    updateProductUsecase,
} from "../../../../usecases"
import {
    CreateProductRoute,
    DeleteProductRoute,
    FindProductRoute,
    ListProductRoute,
    UpdateProductRoute,
} from "./product"
import { CreateUserRoute } from "./user"

const createProductRoute = CreateProductRoute.create(createProductUsecase)
const listProductRoute = ListProductRoute.create(listProductUsecase)
const findProductRoute = FindProductRoute.create(findProductUsecase)
const updateProductRoute = UpdateProductRoute.create(updateProductUsecase)
const deleteProductRoute = DeleteProductRoute.create(deleteProductUsecase)
const createUserRoute = CreateUserRoute.create(createUserUsecase)

const routes = [
    createProductRoute,
    listProductRoute,
    findProductRoute,
    updateProductRoute,
    deleteProductRoute,
    createUserRoute,
]

export default routes
