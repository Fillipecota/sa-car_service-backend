-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "categoriaDoMotor" TEXT,
    "motor" TEXT NOT NULL,
    "pneu" TEXT NOT NULL,
    "carcaca" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);
