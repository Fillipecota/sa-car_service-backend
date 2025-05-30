import { prisma } from "../prisma/client";

class QualityService {

    //  Buscar os últimos 5 registros de qualidade
    public async getAll() {
        return await prisma.quality.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
        });
    }

    //  Atualizar status da qualidade
    public async updateStatus(data: UpdateQualityRequest) {
        const quality = await prisma.quality.findUnique({
            where: { id: data.id },
        });

        if (!quality) {
            throw new Error("Qualidade não encontrada.");
        }

        await prisma.quality.update({
            where: { id: data.id },
            data: { status: data.status },
        });
    }
}

export const qualityService = new QualityService();