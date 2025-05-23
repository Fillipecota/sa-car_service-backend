import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../prisma/client";

export async function manutencaoController(app: FastifyInstance) {

    // Buscar todas as manutenções (products)
    app.get("/manutencao", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const manutencoes = await prisma.product.findMany({
                orderBy: { createdAt: "desc" }
            });
            return reply.code(200).send(manutencoes);
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });
    //  Atualizar status da manutenção
    app.patch("/manutencao/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const { status } = request.body as { status: string };

        try {
            const existe = await prisma.product.findUnique({ where: { id } });

            if (!existe) {
                return reply.code(404).send({ error: "Manutenção não encontrada." });
            }

            const atualizada = await prisma.product.update({
                where: { id },
                data: { status }
            });

            return reply.code(200).send(atualizada);
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });
    //  Deletar manutenção
    app.delete("/manutencao/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            const existe = await prisma.product.findUnique({ where: { id } });

            if (!existe) {
                return reply.code(404).send({ error: "Manutenção não encontrada." });
            }

            await prisma.product.delete({ where: { id } });

            return reply.code(200).send({ message: "Manutenção deletada com sucesso." });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });
}