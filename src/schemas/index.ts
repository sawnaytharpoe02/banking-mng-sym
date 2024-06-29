import { z } from "zod";

export const LoginFormSchema = z.object({
  name: z.string().min(2, { message: "username is required." }),
  password: z.string().min(6, { message: "password is required." }),
});

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
  phone: z.string().min(6, { message: "phone is required" }),
  nrc: z.string().min(12, { message: "nrc is required" }),
  address: z
    .string({ invalid_type_error: "address is required." })
    .min(2, { message: "address is required" }),
  stateCode: z.string().min(6, { message: "please select a state." }),
  townshipCode: z.string().min(6, { message: "please select a township" }),
});

export const AccountFormSchema = z.object({
  accountNumber: z.string().min(10, { message: "account number is required" }),
  customerCode: z.string().min(6, { message: "please select a customer" }),
  balance: z.coerce
    .number({ message: "balance is required." })
    .gt(0, { message: "Please enter an amount greater than $0." }),
});
export const CreateAccountSchema = AccountFormSchema.omit({
  accountNumber: true,
});
export const UpdateAccountSchema = AccountFormSchema.omit({
  customerCode: true,
});

export const TransferFormSchema = z.object({
  transferFromAcc: z
    .string()
    .min(10, { message: "transfer from account number is required" }),
  transferToAcc: z
    .string()
    .min(10, { message: "transfer to account number is required" }),
  amount: z.coerce
    .number({ message: "amount is required." })
    .gt(0, { message: "Please enter an amount greater than $0." }),
});

export const DepositWithDrawFormSchema = z.object({
  accountNumber: z.string().min(10, { message: "account number is required" }),
  amount: z.coerce
    .number({ message: "amount is required." })
    .gt(0, { message: "Please enter an amount greater than $0." }),
});
