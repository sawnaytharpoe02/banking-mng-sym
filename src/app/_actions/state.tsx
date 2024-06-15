"use server";

import db from "@/db";
import { z } from "zod";
import { StateFormSchema } from "@/schemas";
import { notFound } from "next/navigation";

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

  await db.state.update({ where: { id }, data: { stateCode, stateName } });
  return { success: "State updated!", redirect: "/states" };
}

export async function deleteState(id: string) {
  const state = await db.state.findUnique({ where: { id } });
  if (!state) return notFound();

  await db.state.delete({ where: { id } });
}
