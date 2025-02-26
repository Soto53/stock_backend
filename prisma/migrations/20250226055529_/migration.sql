/*
  Warnings:

  - A unique constraint covering the columns `[figi_code]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `figi_code` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "figi_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_figi_code_key" ON "Company"("figi_code");
