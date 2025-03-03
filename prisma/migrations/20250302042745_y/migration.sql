-- DropIndex
DROP INDEX "Company_figi_code_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "figi_code" DROP NOT NULL;
