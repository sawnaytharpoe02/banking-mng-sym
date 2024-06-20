"use server";

import db from "@/db";
import { z } from "zod";
import { StateFormSchema } from "@/schemas";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { StatePlaceholder } from "@/constants/mock-data";

export async function createState(values: z.infer<typeof StateFormSchema>) {
  const validation = StateFormSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { stateCode, stateName } = validation.data;
  const existingState = await db.state.findFirst({
    where: { stateCode },
  });

  if (existingState) return { error: "State already exists!" };

  await db.state.create({ data: { stateCode, stateName } });

  revalidatePath("/states");
  return { success: "State created!", redirect: "/states" };
}

export async function updateState(
  values: z.infer<typeof StateFormSchema>,
  id: string
) {
  const validation = StateFormSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { stateCode, stateName } = validation.data;
  const existingState = await db.state.findUnique({
    where: { id },
  });
  if (!existingState) return { error: "State not found!" };

  const existingStateCode = await db.state.findFirst({
    where: {
      stateCode,
      NOT: { id },
    },
  });
  if (existingStateCode) return { error: "State code must be unique!" };

  await db.state.update({ where: { id }, data: { stateCode, stateName } });

  revalidatePath("/states");
  return { success: "State updated!", redirect: null };
}

export async function deleteState(id: string) {
  const state = await db.state.findUnique({ where: { id } });
  if (!state) return notFound();

  await db.state.delete({ where: { id } });
}

export async function generateState() {
  const stateData = StatePlaceholder.map((item) => ({
    stateCode: item.StateCode,
    stateName: item.StateName,
  }));

  const res = await db.state.createMany({
    data: stateData,
    skipDuplicates: true,
  });
  if (!res) return { error: "Failed to generate state!" };

  revalidatePath("/states");
  return { success: "State generated!", redirect: "/states" };
}
