-- CreateTable
CREATE TABLE "Videogame" (
    "id" SERIAL NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Videogame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "videogame_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "videogame_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "videogame_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_videogame_id_key" ON "Genre"("videogame_id");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_videogame_id_key" ON "Developer"("videogame_id");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_videogame_id_key" ON "Platform"("videogame_id");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_videogame_id_fkey" FOREIGN KEY ("videogame_id") REFERENCES "Videogame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Developer" ADD CONSTRAINT "Developer_videogame_id_fkey" FOREIGN KEY ("videogame_id") REFERENCES "Videogame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platform" ADD CONSTRAINT "Platform_videogame_id_fkey" FOREIGN KEY ("videogame_id") REFERENCES "Videogame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
