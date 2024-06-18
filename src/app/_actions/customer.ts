"use server";

import db from "@/db";
import { CustomerFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { faker } from "@faker-js/faker";

let generatedId = 0;

function generateCustomerCode() {
  generatedId++;
  const paddedId = generatedId.toString().padStart(6, "0");
  const customerCode = "C" + paddedId;

  return customerCode;
}

export async function createUser(values: z.infer<typeof CustomerFormSchema>) {
  const validation = CustomerFormSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invaid Fields" };
  }

  const { customerName, email, nrc, phone, address, townshipCode, stateCode } =
    validation.data;

  const existEmail = await db.user.findFirst({ where: { email } });
  if (existEmail) {
    return { error: "Email already exist." };
  }

  await db.user.create({
    data: {
      customerCode: generateCustomerCode(),
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

  const { customerName, email, nrc, phone, address, townshipCode, stateCode } =
    validation.data;

  const exitstUser = await db.user.findUnique({ where: { id } });
  if (!exitstUser) {
    return { error: "User not found." };
  }

  const existEmail = await db.user.findFirst({ where: { email, NOT: { id } } });
  if (existEmail) {
    return { error: "Email should not be the same." };
  }

  await db.user.update({
    where: { id },
    data: {
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
  return { success: "Customer Updated Successfully", redirect: null };
}

export async function deleteUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { error: "User not found." };

  await db.user.delete({ where: { id } });

  return { success: "User Deleted Successfully", redirect: null };
}

export async function generateUser(count: number = 5) {
  const userArr = Array(count)
    .fill(null)
    .map((_, i) => ({
      customerCode: generateCustomerCode(),
      customerName: faker.person.fullName(),
      email: faker.internet.email(),
      nrc: null,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      townshipCode: faker.location.zipCode(),
      stateCode: faker.location.countryCode(),
    }));

  const res = await db.user.createMany({
    data: userArr,
    skipDuplicates: true,
  });

  if (!res) return { error: "Generate customer failed." };

  revalidatePath("/customers");
  return { success: "Generate customer successfully." };
}
