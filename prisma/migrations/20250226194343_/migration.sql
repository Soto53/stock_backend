/*
  Warnings:

  - You are about to drop the column `stockprice` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "stockprice",
ADD COLUMN     "stock_price" DOUBLE PRECISION;
