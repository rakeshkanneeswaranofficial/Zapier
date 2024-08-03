/*
  Warnings:

  - You are about to drop the column `avalableActionId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `avalableTiggerId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the `AvalableAction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvalableTigger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actionId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_avalableActionId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_avalableTiggerId_fkey";

-- DropIndex
DROP INDEX "Action_zapId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "avalableActionId",
ADD COLUMN     "actionId" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "avalableTiggerId",
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "triggerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Zap" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AvalableAction";

-- DropTable
DROP TABLE "AvalableTigger";

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
