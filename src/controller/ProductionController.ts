import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productService  } from "../service/ProductionService";

export async function producaoController(app: FastifyInstance) {
    // Garante autenticação JWT
    app.addHook("onRequest", app.authenticate);

    // Criar nova produção
    app.post("/Production", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ProduzirVeiculos;
        try {
            await productService .register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    });

    // Buscar produções 
    app.get("/Production", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await productService .getAll()
            return reply.code(200).send(products);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}


// const { categoria, modelo, cor, motor, pneu, quantidade } = request.body as ProduzirVeiculos;
// const user = request.user as { id: string };
// try {
//     const lista = producaoService.create({
//         categoria,
//         modelo,
//         cor,
//         motor,
//         pneu,
//         quantidade,
//         userId: user.id
//     });
//     return reply.code(201).send();
// } catch (error: any) {
//     return reply.code(400).send({ error: error.message });
// }