/*
  Warnings:

  - A unique constraint covering the columns `[townshipCode]` on the table `Township` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Township_townshipCode_key" ON "Township"("townshipCode");
