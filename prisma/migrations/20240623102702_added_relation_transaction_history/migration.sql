-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_fromAccountNumber_fkey" FOREIGN KEY ("fromAccountNumber") REFERENCES "Account"("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_toAccountNumber_fkey" FOREIGN KEY ("toAccountNumber") REFERENCES "Account"("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
