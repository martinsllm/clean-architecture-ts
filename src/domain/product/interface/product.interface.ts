import { Product } from "../entity/product"

export interface ProductInterface {
    save(product: Product): Promise<void>
    list(): Promise<Product[]>
}
