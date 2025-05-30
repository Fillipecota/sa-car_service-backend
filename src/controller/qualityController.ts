import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityService } from "../service/qualityService";


export async function qualityController(app: FastifyInstance) {
    app.addHook("onRequest", app.authenticate);

    // Buscar últimos 5 registros de qualidade
    app.get("/quality", async (_request: FastifyRequest, reply: FastifyReply) => {
        try {
            const qualities = await qualityService.getAll();
            return reply.code(200).send(qualities);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    // Atualizar status da qualidade
    app.patch("/quality", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UpdateQualityRequest;

        try {
            await qualityService.updateStatus(body);
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });
}