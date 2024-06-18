-- AlterTable
ALTER TABLE "dogs" ADD COLUMN     "hospedagemId" TEXT;

-- CreateTable
CREATE TABLE "Hospedagem" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL,
    "saida" TIMESTAMP(3) NOT NULL,
    "pagamento" TIMESTAMP(3) NOT NULL,
    "statusPagamento" BOOLEAN NOT NULL,

    CONSTRAINT "Hospedagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dogs" ADD CONSTRAINT "dogs_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "Hospedagem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedagem" ADD CONSTRAINT "Hospedagem_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
