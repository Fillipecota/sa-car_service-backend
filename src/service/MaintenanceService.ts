import { Manutencao } from "@prisma/client";
import { prisma } from "../prisma/client";
import crypto from "crypto";

class ManutencaoService {
    //  Criar uma nova manutenção
    public async create(data: ManutencaoVeiculos): Promise<void> {
        const novaManutencao: Manutencao = {
            id: crypto.randomUUID(),
            descricao: data.descricao,
            equipamento: data.equipamento,
            responsavel: data.responsavel,
            tipo: data.tipo,
            status: "Pendente",
            agendado: new Date(),
            createdAt: new Date(),
        };

        await prisma.manutencao.create({ data: novaManutencao });
    }

    //  Buscar as últimas 5 manutenções
    public async getAll() {
        const manutencoes = await prisma.manutencao.findMany({
            orderBy: {
                // createdAt: "desc",
            },
            take: 5,
        });

        return manutencoes.map((item) => ({
            id: item.id,
            descricao: item.descricao,
            equipamento: item.equipamento,
            responsavel: item.responsavel,
            tipo: item.tipo,
            status: item.status,
            agendado: item.agendado,
            // createdAt: item.createdAt,
        }));
    }

    //  Alternar status entre "Pendente" e "Concluída"
    public async toggleStatus(id: string) {
        const manutencao = await prisma.manutencao.findUnique({ where: { id } });

        if (!manutencao) {
            throw new Error("Manutenção não encontrada");
        }

        const novoStatus = manutencao.status === "Pendente" ? "Concluída" : "Pendente";

        await prisma.manutencao.update({
            where: { id },
            data: { status: novoStatus },
        });
    }

    //  Deletar manutenção
    public async delete(id: string) {
        const manutencao = await prisma.manutencao.findUnique({ where: { id } });

        if (!manutencao) {
            throw new Error("Manutenção não encontrada");
        }

        await prisma.manutencao.delete({ where: { id } });
    }
}

export const manutencaoService = new ManutencaoService();