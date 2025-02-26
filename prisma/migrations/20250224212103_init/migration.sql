/*
  Warnings:

  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Videogame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Developer" DROP CONSTRAINT "Developer_videogame_id_fkey";

-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_videogame_id_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_videogame_id_fkey";

-- DropTable
DROP TABLE "Developer";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Platform";

-- DropTable
DROP TABLE "Videogame";

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "stockprice" DOUBLE PRECISION NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER NOT NULL,
    "previous_close" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "average_volume" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "news_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "topics" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tickers" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
