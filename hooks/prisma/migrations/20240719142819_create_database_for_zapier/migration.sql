/*
  Warnings:

  - A unique constraint covering the columns `[zapId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zapId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zapId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "zapId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "zapId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Zap" (
    "id" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,

    CONSTRAINT "Zap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRunId_key" ON "ZapRunOutbox"("zapRunId");

-- CreateIndex
CREATE UNIQUE INDEX "Action_zapId_key" ON "Action"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_zapId_key" ON "Trigger"("zapId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
