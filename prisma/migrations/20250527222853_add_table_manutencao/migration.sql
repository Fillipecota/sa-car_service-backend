/*
  Warnings:

  - Added the required column `createdAt` to the `Manutencao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manutencao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
