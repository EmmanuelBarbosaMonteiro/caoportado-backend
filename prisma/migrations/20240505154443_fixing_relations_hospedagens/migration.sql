/*
  Warnings:

  - You are about to drop the column `hospedagemId` on the `dogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_hospedagemId_fkey";

-- AlterTable
ALTER TABLE "dogs" DROP COLUMN "hospedagemId";

-- CreateTable
CREATE TABLE "_hospedagens" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_hospedagens_AB_unique" ON "_hospedagens"("A", "B");

-- CreateIndex
CREATE INDEX "_hospedagens_B_index" ON "_hospedagens"("B");

-- AddForeignKey
ALTER TABLE "_hospedagens" ADD CONSTRAINT "_hospedagens_A_fkey" FOREIGN KEY ("A") REFERENCES "dogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hospedagens" ADD CONSTRAINT "_hospedagens_B_fkey" FOREIGN KEY ("B") REFERENCES "hospedagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
