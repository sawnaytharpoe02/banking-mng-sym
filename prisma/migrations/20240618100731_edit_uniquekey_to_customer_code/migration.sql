/*
  Warnings:

  - A unique constraint covering the columns `[customerCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_customerCode_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_customerCode_key" ON "User"("customerCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "User"("customerCode") ON DELETE RESTRICT ON UPDATE CASCADE;
