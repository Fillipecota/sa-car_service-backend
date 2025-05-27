import { Stock } from "@prisma/client";
import { prisma } from "../prisma/client";

class StockService {
    // Criar item no estoque
    public async register(data: StockVeiculos): Promise<void> {
      if (data.quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que zero.");
      }
  
      const stock: Stock = {
        id: crypto.randomUUID(),
        categoriaDoMotor: data.categoriaDoMotor ?? null,
        motor: data.motor,
        pneu: data.pneu,
        carcaca: data.carcaca,
        chassi: data.chassi,
        quantidade: data.quantidade,
      };
  
      await prisma.stock.create({
        data: stock,
      });
    }
  
    // Atualizar quantidade (incrementar)
    public async update({ stockId, quantidade }: UpdateStock): Promise<void> {
      const stock = await prisma.stock.findUnique({
        where: { id: stockId },
      });
  
      if (!stock) {
        throw new Error("Item de estoque não encontrado.");
      }
  
      await prisma.stock.update({
        where: { id: stockId },
        data: {
          quantidade: stock.quantidade + quantidade,
        },
      });
    }
  
    // Buscar todos os itens
    public async getAll() {
      const stocks = await prisma.stock.findMany({
        orderBy: { categoriaDoMotor: "asc" },
      });
  
      return stocks.map((item) => ({
        id: item.id,
        categoriaDoMotor: item.categoriaDoMotor,
        motor: item.motor,
        pneu: item.pneu,
        carcaca: item.carcaca,
        chassi: item.chassi,
        quantidade: item.quantidade,
      }));
    }
  
    // Deletar item do estoque
    public async delete(stockId: string) {
      const stock = await prisma.stock.findUnique({
        where: { id: stockId },
      });
  
      if (!stock) {
        throw new Error("Item de estoque não encontrado.");
      }
  
      await prisma.stock.delete({
        where: { id: stockId },
      });
    }
  }
  
  export const stockService = new StockService();