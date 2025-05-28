import { Product, Quality } from "@prisma/client";
import { prisma } from "../prisma/client";
import crypto from "crypto";


class ProductService {
    // Registrar veículos no banco e criar entrada na qualidade
    public async register(data: ProduzirVeiculos, userName: string): Promise<void> {
        const anoAtual = new Date().getFullYear();

        for (let i = 0; i < data.quantidade; i++) {
            const produtoId = crypto.randomUUID();
            const qualidadeId = crypto.randomUUID();

            const novoProduto: Product = {
                id: produtoId,
                categoria: data.categoria,
                modelo: data.modelo,
                cor: data.cor,
                motor: data.motor,
                pneu: data.pneu,
                ano: anoAtual,
                status: "Em produção",
                responsavel: userName,
                createdAt: new Date(),
            };

            await prisma.product.create({
                data: novoProduto,
            });

            const novaQualidade: Quality = {
                id: qualidadeId,
                produto: data.modelo,
                lote: produtoId,
                responsavel: userName,
                status: "Pendente",
                createdAt: new Date(),
            };

            await prisma.quality.create({
                data: novaQualidade,
            });
        }
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
            ano: produto.ano,
            status: produto.status,
            responsavel: produto.responsavel,
            createdAt: produto.createdAt,
        }));
    }
}

export const productService = new ProductService();