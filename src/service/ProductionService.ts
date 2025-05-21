
// import {  Product } from "@prisma/client";
// import { prisma } from "../prisma/client";

// class ProductService {
//     private OS: number = 0;

//     public async register(data: ProduzirVeiculos): Promise<void> {
//         const novo = prisma.mark.findUnique({ where: { id: data.modelo } })
//         if (!novo) {
//             throw new Error("Modelo não existe!!!")
//         }

//     //     const product: Product = {
//     //         id: crypto.randomUUID(),
//     //         categoria: data.categoria,
//     //         modelo: data.modelo,
//     //         cor: data.cor,
//     //         motor: data.motor,
//     //         pneu: data.pneu,
//     //         createdAt: new Date(),
//     //     }

//     //     await prisma.product.create({ data: product })
//     // }

//     // public async getAll() {
//     //     const products = await prisma.product.findMany({
//     //         include: {
//     //             mark: true
//     //         }
//     //     })

//     //     return products.map(product => ({
//     //         id: product.id,
//     //         categoria: product.categoria,
//     //         modelo: product.modelo,
//     //         cor: product.cor,
//     //         motor: product.motor,
//     //         pneu: product.pneu,
//     //         createdAt: product.createdAt,
//     //     }))
//     // }
// }

// export const ProductionService = new ProductService();