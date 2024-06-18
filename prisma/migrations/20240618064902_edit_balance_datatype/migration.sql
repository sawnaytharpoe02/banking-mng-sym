/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
