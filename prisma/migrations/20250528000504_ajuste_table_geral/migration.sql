/*
  Warnings:

  - Added the required column `responsavel` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "responsavel" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;
