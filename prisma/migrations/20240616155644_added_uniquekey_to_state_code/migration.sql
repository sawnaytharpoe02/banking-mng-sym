/*
  Warnings:

  - A unique constraint covering the columns `[stateCode]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Township" DROP CONSTRAINT "Township_stateCode_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "State_stateCode_key" ON "State"("stateCode");

-- AddForeignKey
ALTER TABLE "Township" ADD CONSTRAINT "Township_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "State"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;
