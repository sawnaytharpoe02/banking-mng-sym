import { z } from "zod";

export const StateFormSchema = z.object({
  stateCode: z.string().min(6, { message: "state code is required" }),
  stateName: z.string().min(2, { message: "state name is required." }),
});

export const TownshipFormSchema = z.object({
  townshipCode: z.string().min(6, { message: "township code is required" }),
  townshipName: z.string().min(2, { message: "township name is required" }),
  stateCode: z.string().min(6, { message: "state code is required" }),
});
