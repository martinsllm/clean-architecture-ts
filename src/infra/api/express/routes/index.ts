import {
    createProductUsecase,
    createUserUsecase,
    deleteProductUsecase,
    findProductUsecase,
    listProductUsecase,
    loginUserUsecase,
    updateProductUsecase,
} from "../../../../usecases"
import {
    CreateProductRoute,
    DeleteProductRoute,
    FindProductRoute,
    ListProductRoute,
    UpdateProductRoute,
} from "./product"
import { CreateUserRoute, LoginUserRoute } from "./user"

const createProductRoute = CreateProductRoute.create(createProductUsecase)
const listProductRoute = ListProductRoute.create(listProductUsecase)
const findProductRoute = FindProductRoute.create(findProductUsecase)
const updateProductRoute = UpdateProductRoute.create(updateProductUsecase)
const deleteProductRoute = DeleteProductRoute.create(deleteProductUsecase)
const createUserRoute = CreateUserRoute.create(createUserUsecase)
const loginUserRoute = LoginUserRoute.create(loginUserUsecase)

const routes = [
    createProductRoute,
    listProductRoute,
    findProductRoute,
    updateProductRoute,
    deleteProductRoute,
    createUserRoute,
    loginUserRoute,
]

export default routes
