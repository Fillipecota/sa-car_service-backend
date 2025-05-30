import { Product, Quality } from "@prisma/client";
import { prisma } from "../prisma/client";
import crypto from "crypto";

class ProductService {

    // ✅ Registrar veículos e criar entrada na qualidade
    public async register(data: CreateProductRequest): Promise<void> {
        const anoAtual = new Date().getFullYear();

        for (let i = 0; i < data.quantidade; i++) {
            const produtoId = crypto.randomUUID();
            const qualidadeId = crypto.randomUUID();

            // Cria produto
            await prisma.product.create({
                data: {
                    id: produtoId,
                    categoria: data.categoria,
                    modelo: data.modelo,
                    cor: data.cor,
                    motor: data.motor,
                    pneu: data.pneu,
                    ano: anoAtual,
                    status: "Em produção",
                    responsavel: data.responsavel,
                    createdAt: new Date(),
                },
            });
  
            await prisma.quality.create({
                data: {
                    id: qualidadeId,
                    produto: data.modelo,
                    lote: produtoId,
                    responsavel: data.responsavel,
                    status: "Pendente",
                    createdAt: new Date(),
                },
            });
        }
    }

    // Atualizar status do produto
    public async updateStatus(data: { id: string; status: string }) {
        const product = await prisma.product.findUnique({
            where: { id: data.id },
        });

        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        await prisma.product.update({
            where: { id: data.id },
            data: { status: data.status },
        });
    }

    // Buscar últimos 5 produtos
    public async getAll() {
        return await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
        });
    }

    // Buscar por categoria
    public async getByCategory(category: string) {
        return await prisma.product.findMany({
            where: { categoria: category },
        });
    }
}

export const productService = new ProductService();


          // const novoProduto: Product = {
            //     id: produtoId,
            //     categoria: data.categoria,
            //     modelo: data.modelo,
            //     cor: data.cor,
            //     motor: data.motor,
            //     pneu: data.pneu,
            //     ano: anoAtual,
            //     status: "Em produção",
            //     responsavel: userName,
            //     createdAt: new Date(),
            // };

            // await prisma.product.create({ data: novoProduto });
            // Cria qualidade

