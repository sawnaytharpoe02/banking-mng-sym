import { z } from "zod";

export const StateFormSchema = z.object({
  stateCode: z.string().nonempty(),
  stateName: z.string().nonempty(),
});
