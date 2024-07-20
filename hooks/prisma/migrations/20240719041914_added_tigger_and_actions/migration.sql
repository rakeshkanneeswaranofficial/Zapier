/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the `AvailableTrigger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zap` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avalableTiggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "triggerId",
ADD COLUMN     "avalableTiggerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AvailableTrigger";

-- DropTable
DROP TABLE "Zap";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvalableTigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvalableTigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "avalableActionId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvalableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvalableAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_avalableTiggerId_fkey" FOREIGN KEY ("avalableTiggerId") REFERENCES "AvalableTigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_avalableActionId_fkey" FOREIGN KEY ("avalableActionId") REFERENCES "AvalableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
