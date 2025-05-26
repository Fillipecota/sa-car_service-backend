import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../prisma/client";

export async function qualidadeController(app: FastifyInstance) {

    // Buscar todas as qualidades (products)
    app.get("/qualidade", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const qualidades = await prisma.product.findMany({
                orderBy: { createdAt: "desc" }
            });
            return reply.code(200).send(qualidades);
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    // Atualizar status da qualidade
    app.patch("/qualidade/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const { status } = request.body as { status: string };

        try {
            const existe = await prisma.product.findUnique({ where: { id } });

            if (!existe) {
                return reply.code(404).send({ error: "Qualidade não encontrada." });
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

    // Deletar qualidade
    app.delete("/qualidade/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            const existe = await prisma.product.findUnique({ where: { id } });

            if (!existe) {
                return reply.code(404).send({ error: "Qualidade não encontrada." });
            }

            await prisma.product.delete({ where: { id } });

            return reply.code(200).send({ message: "Qualidade deletada com sucesso." });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });
}