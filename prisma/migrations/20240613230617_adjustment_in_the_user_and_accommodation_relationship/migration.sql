/*
  Warnings:

  - You are about to drop the column `isNeutered` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `isTreatedAgainstTicks` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `isTreatedAgainstWorms` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `vaccinesCard` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the `_hospedagens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospedagem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `is_neutered` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_treated_against_ticks` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_treated_against_worms` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccines_card` to the `dogs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- DropForeignKey
ALTER TABLE "_hospedagens" DROP CONSTRAINT "_hospedagens_A_fkey";

-- DropForeignKey
ALTER TABLE "_hospedagens" DROP CONSTRAINT "_hospedagens_B_fkey";

-- DropForeignKey
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "hospedagem" DROP CONSTRAINT "hospedagem_owner_id_fkey";

-- AlterTable
ALTER TABLE "dogs" DROP COLUMN "isNeutered",
DROP COLUMN "isTreatedAgainstTicks",
DROP COLUMN "isTreatedAgainstWorms",
DROP COLUMN "owner_id",
DROP COLUMN "vaccinesCard",
ADD COLUMN     "is_neutered" BOOLEAN NOT NULL,
ADD COLUMN     "is_treated_against_ticks" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_treated_against_worms" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "vaccines_card" TEXT NOT NULL;

-- DropTable
DROP TABLE "_hospedagens";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "hospedagem";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL,
    "check_in_date" TIMESTAMP(3) NOT NULL,
    "check_out_date" TIMESTAMP(3) NOT NULL,
    "is_paid" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "dog_id" TEXT NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "dogs" ADD CONSTRAINT "dogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
