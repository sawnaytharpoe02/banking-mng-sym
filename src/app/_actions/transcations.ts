"use server";

import { z } from "zod";
import { DepositWithDrawFormSchema, TransferFormSchema } from "@/schemas";
import db from "@/db";
import { getAccount } from "@/lib/data/account";
import { revalidatePath } from "next/cache";

export async function transferTransaction(
  values: z.infer<typeof TransferFormSchema>
) {
  const validation = TransferFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { transferFromAcc, transferToAcc, amount } = validation.data;

  if (transferFromAcc === transferToAcc)
    return { error: "Transfer to and from account cannot be the same." };

  const [existTransferFromAcc, existTransferToAcc] = await Promise.all([
    getAccount(transferFromAcc),
    getAccount(transferToAcc),
  ]);

  if (existTransferFromAcc === null)
    return { error: "Transfer from account not found." };

  if (existTransferToAcc === null)
    return { error: "Transfer to account not found." };

  const isBalanceEnough = existTransferFromAcc.balance >= amount;
  if (!isBalanceEnough) return { error: "Insufficient balance." };

  try {
    await db.$transaction([
      db.account.update({
        where: { accountNumber: transferFromAcc },
        data: { balance: { decrement: amount } },
      }),

      db.account.update({
        where: { accountNumber: transferToAcc },
        data: { balance: { increment: amount } },
      }),

      db.transactionHistory.create({
        data: {
          fromAccountNumber: transferFromAcc,
          toAccountNumber: transferToAcc,
          amount,
        },
      }),
    ]);

    revalidatePath("/accounts");
    return { success: "Transfer successful." };
  } catch (error) {
    return { error: "Transition failed." };
  }
}

export async function depositTranscation(
  values: z.infer<typeof DepositWithDrawFormSchema>
) {
  const validation = DepositWithDrawFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { accountNumber, amount } = validation.data;

  const existAccount = await getAccount(accountNumber);
  if (existAccount === null) return { error: "Account not found." };

  try {
    await db.account.update({
      where: { accountNumber },
      data: { balance: { increment: amount } },
    });

    revalidatePath("/accounts");
    return { success: "Deposit successful." };
  } catch (error) {
    return { error: "Deposit process failed." };
  }
}

export async function withdrawTranscation(
  values: z.infer<typeof DepositWithDrawFormSchema>
) {
  const validation = DepositWithDrawFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { accountNumber, amount } = validation.data;

  const account = await getAccount(accountNumber);
  if (account === null) return { error: "Account not found." };

  const isBalanceEnough = account.balance >= amount;
  if (!isBalanceEnough) return { error: "Insufficient balance." };

  try {
    await db.account.update({
      where: { accountNumber },
      data: { balance: { decrement: amount } },
    });

    revalidatePath("/accounts");
    return { success: "Withdraw successful." };
  } catch (error) {
    return { error: "Withdraw process failed." };
  }
}
