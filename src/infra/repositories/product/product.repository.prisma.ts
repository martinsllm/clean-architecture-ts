import { PrismaClient } from "@prisma/client"
import { Product } from "../../../domain/product/entity/product"
import { ProductInterface } from "../../../domain/product/interface/product.interface"
import { NotFoundError } from "../../middlewares/helpers/api-errors"

export class ProductRepositoryPrisma implements ProductInterface {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrisma(prismaClient)
    }

    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }

        await this.prismaClient.product.create({
            data,
        })
    }

    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany()

        const productList = products.map((p: any) => {
            const product = Product.with({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity,
            })

            return product
        })

        return productList
    }

    public async findById(id: string): Promise<Product> {
        const product = await this.prismaClient.product.findFirst({
            where: {
                id,
            },
        })

        if (!product) throw new NotFoundError("Product Not Found")

        const productData = Product.with({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        })

        return productData
    }

    public async update(product: Product): Promise<void> {
        const data = {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }

        await this.prismaClient.product.update({
            where: {
                id: product.id,
            },
            data,
        })
    }

    public async delete(id: string): Promise<void> {
        await this.prismaClient.product.delete({
            where: {
                id,
            },
        })
    }
}
