/*
  Warnings:

  - You are about to alter the column `accountNumber` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fromAccountNumber` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `toAccountNumber` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "accountNumber" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "fromAccountNumber" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "toAccountNumber" SET DATA TYPE VARCHAR(255);
