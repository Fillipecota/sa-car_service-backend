import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualidadeService } from "../service/qualityService";

export async function qualidadeController(app: FastifyInstance) {
    //  Protege todas as rotas com autenticação
    app.addHook("onRequest", app.authenticate);

    //  Cadastrar qualidade
    app.post("/qualidade", async (request: FastifyRequest, reply: FastifyReply) => {
        const data = request.body as {
            name: string;
            description: string;
            amount: number;
            category: string;
            markId: string;
            status: string;
        };

        try {
            await qualidadeService.register(data);
            return reply.status(201).send({ message: "Qualidade cadastrada com sucesso!" });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    //  Buscar todas as qualidades
    app.get("/qualidade", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const qualidades = await qualidadeService.getAll();
            return reply.status(200).send(qualidades);
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    //  Atualizar status da qualidade
    app.patch("/qualidade/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const { status } = request.body as { status: string };

        try {
            await qualidadeService.updateStatus({ id, status });
            return reply.status(200).send({ message: "Status atualizado com sucesso!" });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    //  Deletar qualidade
    app.delete("/qualidade/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            await qualidadeService.delete(id);
            return reply.status(200).send({ message: "Qualidade removida com sucesso!" });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });
}