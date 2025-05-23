import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ProductServiceInstance } from "../service/ProductionService";

export async function producaoController(app: FastifyInstance) {
    // Garante autenticação JWT
    app.addHook("onRequest", app.authenticate);

    // Criar nova produção
    app.post('/Production', async (request, reply) => {
        const data = request.body as ProduzirVeiculos;
    
        try {
            await ProductServiceInstance.register(data);
            return reply.status(201).send({ message: "Produzido com sucesso!" });
        } catch (error:any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    // Buscar produções 
    app.get("/Production", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await ProductServiceInstance .getAll()
            return reply.code(200).send(products);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })
    

}
