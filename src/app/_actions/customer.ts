"use server";

import db from "@/db";
import { CustomerFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createUser(values: z.infer<typeof CustomerFormSchema>) {
  const validation = CustomerFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invaid Fields" };
  }

  const {
    customerCode,
    customerName,
    email,
    nrc,
    phone,
    address,
    townshipCode,
    stateCode,
  } = validation.data;

  const exitstCustomerCode = await db.user.findFirst({
    where: { customerCode },
  });
  if (exitstCustomerCode) {
    return { error: "Customer code should be unique." };
  }

  const existEmail = await db.user.findFirst({ where: { email } });
  if (existEmail) {
    return { error: "Email already exist." };
  }

  await db.user.create({
    data: {
      customerCode,
      customerName,
      email,
      nrc,
      phone,
      address,
      townshipCode,
      stateCode,
    },
  });

  revalidatePath("/customers");
  return { success: "Customer Created Successfully", redirect: "/customers" };
}

export async function updateUser(
  values: z.infer<typeof CustomerFormSchema>,
  id: string
) {
  const validation = CustomerFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invaid Fields" };
  }

  const {
    customerCode,
    customerName,
    email,
    phone,
    address,
    townshipCode,
    stateCode,
  } = validation.data;

  const exitstUser = await db.user.findUnique({ where: { id } });
  if (exitstUser) {
    return { error: "User already exist." };
  }

  const exitstCustomerCode = await db.user.findFirst({
    where: { customerCode, NOT: { id } },
  });
  if (exitstCustomerCode) {
    return { error: "Customer code should not be the same." };
  }

  const existEmail = await db.user.findFirst({ where: { email, NOT: { id } } });
  if (existEmail) {
    return { error: "Email should not be the same." };
  }

  await db.user.update({
    where: { id },
    data: {
      customerCode,
      customerName,
      email,
      phone,
      address,
      townshipCode,
      stateCode,
    },
  });

  revalidatePath("/customers");
  return { success: "Customer Updated Successfully", redirect: null };
}

export async function deleteUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { error: "User not found." };

  await db.user.delete({ where: { id } });

  return { success: "User Deleted Successfully", redirect: null };
}
