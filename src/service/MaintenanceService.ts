import { prisma } from "../prisma/client";

export class MaintenanceService {
  
  // Listar todas as manutenções
  async findAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  // Buscar uma manutenção pelo ID
  async findById(id: string) {
    return await prisma.product.findUnique({
      where: { id }
    });
  }

  // Atualizar o status da manutenção
  async updateStatus(id: string, status: string) {
    const manutencao = await prisma.product.findUnique({
      where: { id }
    });

    if (!manutencao) {
      throw new Error("Manutenção não encontrada.");
    }

    return await prisma.product.update({
      where: { id },
      data: { status }
    });
  }

  // Deletar manutenção
  async delete(id: string) {
    const manutencao = await prisma.product.findUnique({
      where: { id }
    });

    if (!manutencao) {
      throw new Error("Manutenção não encontrada.");
    }

    await prisma.product.delete({
      where: { id }
    });

    return { message: "Manutenção deletada com sucesso." };
  }
}