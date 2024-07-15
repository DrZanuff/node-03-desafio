-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('FILHOTE', 'ADULTO', 'SENIOR');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "PetDependency" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('AMBIENTE_AMPLO', 'LOCAIS_PEQUENOS');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('UM', 'DOIS', 'TRES', 'QUATRO', 'CINCO');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "whatsapp" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "PetAge" NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy" "PetEnergy" NOT NULL,
    "dependency" "PetDependency" NOT NULL,
    "environment" "PetEnvironment" NOT NULL,
    "photo" TEXT NOT NULL,
    "requirements" TEXT[],
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE INDEX "pets_org_id_idx" ON "pets"("org_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
