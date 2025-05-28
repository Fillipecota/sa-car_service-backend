/*
  Warnings:

  - You are about to drop the `Manutencao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Manutencao";

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "equipamento" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "agendado" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality" (
    "id" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quality_pkey" PRIMARY KEY ("id")
);
