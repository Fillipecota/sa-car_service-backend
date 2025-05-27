import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { stockService } from "../service/stockService";

export async function stockController(app: FastifyInstance) {
    app.addHook("onRequest", app.authenticate);

    //  Cadastrar item no estoque
    app.post("/stock", async (request: FastifyRequest, reply: FastifyReply) => {
        const data = request.body as {
            categoriaDoMotor?: string;
            motor: string;
            pneu: string;
            carcaca: string;
            chassi: string;
            quantidade: number;
        };

        try {
            await stockService.register(data);
            return reply.status(201).send({ message: "Item cadastrado com sucesso!" });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    //  Buscar todos os itens
    app.get("/stock", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const items = await stockService.getAll();
            return reply.status(200).send(items);
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    //  Atualizar quantidade no estoque
    app.patch("/stock/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const { quantidade } = request.body as { quantidade: number };

        try {
            await stockService.update({ stockId: id, quantidade });
            return reply.status(200).send({ message: "Quantidade atualizada com sucesso!" });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });

    //  Deletar item
    app.delete("/stock/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            await stockService.delete(id);
            return reply.status(200).send({ message: "Item removido com sucesso!" });
        } catch (error: any) {
            return reply.code(400).send({ error: error.message });
        }
    });
}