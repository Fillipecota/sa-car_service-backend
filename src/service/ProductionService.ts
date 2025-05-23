
import { Product} from "@prisma/client";
import { prisma } from "../prisma/client";
import crypto from "crypto";

class ProductService {
    //  Registrar veículos no banco
    public async register(data: ProduzirVeiculos): Promise<void> {
        const novosProdutos: Product = {
            id: crypto.randomUUID(),
            categoria: data.categoria,
            modelo: data.modelo,
            cor: data.cor,
            motor: data.motor,
            pneu: data.pneu,
            ano: new Date().getFullYear(),
            status: "Em produção",         
            createdAt: new Date(),
        };

        await prisma.product.create({ data: novosProdutos })
    }

    // Buscar os últimos 5 veículos produzidos
    public async getAll() {
        const produtos = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });

        return produtos.map((produto) => ({
            id: produto.id,
            categoria: produto.categoria,
            modelo: produto.modelo,
            cor: produto.cor,
            motor: produto.motor,
            pneu: produto.pneu,
            createdAt: produto.createdAt,
        }));
    }
}

export const ProductServiceInstance = new ProductService();