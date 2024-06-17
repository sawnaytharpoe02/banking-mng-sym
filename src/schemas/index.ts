import { z } from "zod";

export const StateFormSchema = z.object({
  stateCode: z.string().min(6, { message: "state code is required" }),
  stateName: z.string().min(2, { message: "state name is required." }),
});

export const TownshipFormSchema = z.object({
  townshipCode: z.string().min(6, { message: "township code is required" }),
  townshipName: z.string().min(2, { message: "township name is required" }),
  stateCode: z.string().min(6, { message: "please select a state." }),
});

export const CustomerFormSchema = z.object({
  customerName: z.string().min(2, { message: "customer name is required" }),
  email: z.string().email({ message: "please enter a valid email address." }),
  nrc: z.string().min(12, { message: "nrc is required" }),
  phone: z.string().min(6, { message: "phone is required" }),
  address: z
    .string({ invalid_type_error: "address is required." })
    .min(2, { message: "address is required" }),
  townshipCode: z.string().min(6, { message: "please select a township" }),
  stateCode: z.string().min(6, { message: "please select a state." }),
});
