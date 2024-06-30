/*
  Warnings:

  - You are about to drop the `Hospedagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hospedagem" DROP CONSTRAINT "Hospedagem_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_hospedagemId_fkey";

-- DropTable
DROP TABLE "Hospedagem";

-- CreateTable
CREATE TABLE "hospedagem" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL,
    "saida" TIMESTAMP(3) NOT NULL,
    "pagamento" TIMESTAMP(3) NOT NULL,
    "statusPagamento" BOOLEAN NOT NULL,

    CONSTRAINT "hospedagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dogs" ADD CONSTRAINT "dogs_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "hospedagem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospedagem" ADD CONSTRAINT "hospedagem_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
