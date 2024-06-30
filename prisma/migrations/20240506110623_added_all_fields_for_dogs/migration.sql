/*
  Warnings:

  - Added the required column `birthdate` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breed` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isNeutered` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTreatedAgainstTicks` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTreatedAgainstWorms` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccinesCard` to the `dogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dogs" ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "isNeutered" BOOLEAN NOT NULL,
ADD COLUMN     "isTreatedAgainstTicks" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isTreatedAgainstWorms" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "vaccinesCard" TEXT NOT NULL;
