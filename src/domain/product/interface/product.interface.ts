import { Product } from "../entity/product"

export interface ProductInterface {
    save(product: Product): Promise<void>
    list(): Promise<Product[]>
    findById(id: string): Promise<Product>
    update(product: Product): Promise<void>
    delete(id: string): Promise<void>
}
