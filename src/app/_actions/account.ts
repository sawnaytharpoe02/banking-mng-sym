"use server";

import { z } from "zod";
import { CreateAccountSchema, UpdateAccountSchema } from "@/schemas";
import db from "@/db";
import { revalidatePath } from "next/cache";

function generateAccountNumber() {
  const min = 100000000000000;
  const max = 999999999999999;
  const accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return accountNumber.toString();
}

export async function createAccount(
  values: z.infer<typeof CreateAccountSchema>
) {
  console.log(values);
  const validation = CreateAccountSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { customerCode, balance } = validation.data;

  await db.account.create({
    data: {
      accountNumber: generateAccountNumber(),
      customerCode,
      balance,
    },
  });

  revalidatePath("/accounts");
  return { success: "Account created successfully.", redirect: "/accounts" };
}

export async function updateAccount(
  values: z.infer<typeof UpdateAccountSchema>,
  id: string
) {
  const validation = UpdateAccountSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }
  const { accountNumber, balance } = validation.data;

  const account = await db.account.findUnique({
    where: { id, accountNumber },
  });
  if (!account) return { error: "Account not found." };

  await db.account.update({
    where: { accountNumber },
    data: {
      balance,
    },
  });

  revalidatePath("/accounts");
  return { success: "Account updated successfully.", redirect: null };
}

export async function deleteAccount(id: string) {
  const account = await db.account.findUnique({ where: { id } });
  if (!account) return { error: "Account not found." };

  await db.account.delete({ where: { id } });

  revalidatePath("/accounts");
  return { success: "Account Deleted Successfully", redirect: null };
}
