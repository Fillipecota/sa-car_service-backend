import { Product } from "@prisma/client";
import { prisma } from "../prisma/client";

class QualidadeService {
    //  Cadastrar nova qualidade
    public async register(data: CreateQualidade): Promise<void> {
        const mark = await prisma.product.findUnique({ where: { id: data.markId } });

        if (!mark) {
            throw new Error("Marca não encontrada.");
        }

        // const qualidade: Product = {
        //     id: crypto.randomUUID(),
        //     categoria: data.category,
        //     modelo: data.category, 
        // };

    //     await prisma.product.create({ data: qualidade });
    }

    // Buscar todas as qualidades
    public async getAll() {
        const qualidades = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        return qualidades.map(q => ({
        
        }));
    }

    // Atualizar status
    public async updateStatus({ id, status }: UpdateStatus) {
        const existe = await prisma.product.findUnique({ where: { id } });

        if (!existe) {
            throw new Error("Qualidade não encontrada.");
        }

        await prisma.product.update({
            where: { id },
            data: { status }
        });
    }

    //  Deletar qualidade
    public async delete(id: string) {
        const existe = await prisma.product.findUnique({ where: { id } });

        if (!existe) {
            throw new Error("Qualidade não encontrada.");
        }

        await prisma.product.delete({
            where: { id }
        });
    }
}

export const qualidadeService = new QualidadeService();