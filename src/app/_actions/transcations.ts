"use server";

import { z } from "zod";
import { TransferFormSchema } from "@/schemas";
import { getAccount } from "@/lib/data";
import db from "@/db";
import { revalidatePath } from "next/cache";

export async function transferTranscation(
  values: z.infer<typeof TransferFormSchema>
) {
  const validation = TransferFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { transferFromAcc, transferToAcc, amount } = validation.data;

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
    ]);

    revalidatePath("/accounts");
    return { success: "Transfer successful." };
  } catch (error) {
    return { error: "Transition failed." };
  }
}
