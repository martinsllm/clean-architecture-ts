import {
    createProductUsecase,
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

const createProductRoute = CreateProductRoute.create(createProductUsecase)
const listProductRoute = ListProductRoute.create(listProductUsecase)
const findProductRoute = FindProductRoute.create(findProductUsecase)
const updateProductRoute = UpdateProductRoute.create(updateProductUsecase)
const deleteProductRoute = DeleteProductRoute.create(deleteProductUsecase)

const routes = [
    createProductRoute,
    listProductRoute,
    findProductRoute,
    updateProductRoute,
    deleteProductRoute,
]

export default routes
