"use server";

import db from "@/db";
import { z } from "zod";
import { TownshipFormSchema } from "@/schemas";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TownshipPlaceholder } from "@/utils/mock-data";

export async function createTownship(
  values: z.infer<typeof TownshipFormSchema>
) {
  const validation = TownshipFormSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { stateCode, townshipName, townshipCode } = validation.data;
  const existingTownship = await db.township.findFirst({
    where: { townshipCode },
  });

  if (existingTownship) return { error: "Township already exists!" };

  await db.township.create({ data: { stateCode, townshipName, townshipCode } });

  revalidatePath("/townships")
  return { success: "Township created!", redirect: "/townships" };
}

export async function updateTownship(
  values: z.infer<typeof TownshipFormSchema>,
  id: string
) {
  const validation = TownshipFormSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { stateCode, townshipName, townshipCode } = validation.data;
  const existingTownship = await db.township.findFirst({
    where: { id },
  });
  if (!existingTownship) return { error: "Township not found!" };

  await db.township.update({
    where: { id },
    data: { stateCode, townshipName, townshipCode },
  });

  revalidatePath("/townships")
  return { success: "Township updated!", redirect: null };
}

export async function deleteTownship(id: string) {
  const township = await db.township.findUnique({ where: { id } });
  if (!township) return notFound();

  await db.township.delete({ where: { id } });
}

export async function generateTownship() {
  const townshipData = TownshipPlaceholder.map((item) => ({
    townshipCode: item.TownshipCode,
    townshipName: item.TownshipName,
    stateCode: item.StateCode,
  }));

  const res = await db.township.createMany({
    data: townshipData,
  });
  if (!res) return { error: "Failed to generate townships!" };

  revalidatePath("/townships");
  return { success: "Townships generated!", redirect: "/townships" };
}
