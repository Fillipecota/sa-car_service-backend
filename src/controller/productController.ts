import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productService } from "../service/ProductService";



export async function productController(app: FastifyInstance) {
     // Garante autenticação JWT
     app.addHook("onRequest", app.authenticate);

    // Registrar produto e criar controle de qualidade
    app.post("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateProductRequest;

        try {
            await productService.register(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    // Atualizar status do produto
    app.patch("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as { id: string; status: string };

        try {
            await productService.updateStatus(body);
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    // Buscar últimos 5 produtos
    app.get("/product", async (_request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await productService.getAll();
            return reply.code(200).send(products);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    // Buscar produtos por categoria
    app.get("/product/search", async (request: FastifyRequest, reply: FastifyReply) => {
        const { category } = request.query as { category: string };

        try {
            const products = await productService.getByCategory(category);
            return reply.code(200).send(products);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });
}