"use server";

import db from "@/db";
import { z } from "zod";
import { StateFormSchema } from "@/schemas";

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

  return { success: "State created!" };
}
