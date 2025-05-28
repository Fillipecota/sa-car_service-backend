import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { manutencaoService } from "../service/maintenanceService";


export async function manutencaoController(app: FastifyInstance) {
    // Garante autenticação JWT
    app.addHook("onRequest", app.authenticate);

    //  Criar nova manutenção
    app.post("/Maintenance", async (request, reply) => {
        const data = request.body as Omit<ManutencaoVeiculos, "id" | "status">;

        try {
            const nova = await manutencaoService.create(data);
            return reply.code(201).send(nova);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });


    //  Listar todas as manutenções
    app.get("/Maintenance", async (_request, reply) => {
        try {
            const manutencoes = await manutencaoService.getAll();
            return reply.code(200).send(manutencoes);
        } catch (error: any) {
            return reply.code(500).send({ erro: error.message });
        }
    });


    // Alterar status (Concluída / Pendente)
    app.patch("/Maintenance/:id/status", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = request.params;

        try {
            const manutencao = await manutencaoService.toggleStatus(id);
            return reply.code(200).send(manutencao);
        } catch (error: any) {
            return reply.code(404).send({ erro: error.message });
        }
    });

    //  Excluir manutenção
    app.delete("/Maintenance/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = request.params;

        try {
            await manutencaoService.delete((id));
            return reply.code(204).send();
        } catch (error: any) {
            return reply.code(404).send({ erro: error.message });
        }
    });
}