-- CreateEnum
CREATE TYPE "StatusAccommodation" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');

-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "status" "StatusAccommodation" NOT NULL DEFAULT 'PENDING';
