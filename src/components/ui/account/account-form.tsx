"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateAccountSchema, UpdateAccountSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Account, User } from "@prisma/client";
import { createAccount, updateAccount } from "@/app/_actions/account";
import { formatCurrency } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AccountFormProps = {
  account?: Account | null;
  customer: User[] | null;
};

const AccountForm = ({ account, customer }: AccountFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  type FormSchema = z.infer<
    typeof CreateAccountSchema | typeof UpdateAccountSchema
  >;
  const form = useForm<FormSchema>({
    mode: "onBlur",
    resolver: zodResolver(account ? UpdateAccountSchema : CreateAccountSchema),
    defaultValues: account
      ? {
          accountNumber: "",
          customerCode: account.customerCode,
          balance: account.balance,
        }
      : {
          accountNumber: "",
          customerCode: "",
          balance: undefined,
        },
  });
  const _balance = form.watch("balance");

  useEffect(() => {
    localStorage.setItem("isFormModified", form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  const onSubmit = (values: FormSchema) => {
    startTransition(async () => {
      try {
        let data;
        if (!account) {
          data = await createAccount(
            values as z.infer<typeof CreateAccountSchema>
          );
        } else {
          data = await updateAccount(
            values as z.infer<typeof UpdateAccountSchema>,
            account.id
          );
        }

        if (data?.error) {
          form.reset();
          toast({
            variant: "destructive",
            description: data.error,
          });
        }

        if (data?.success) {
          form.reset();
          toast({
            description: data.success,
          });
          data?.redirect ? router.push(data?.redirect) : router.back();
        }
      } catch (error) {
        toast({ description: "Something went wrong!" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {account ? (
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="account number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="customerCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customer?.map((item) => (
                        <SelectItem key={item.id} value={item.customerCode}>
                          {item.customerName} ({item.phone})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="balance"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  disabled={pending}
                />
              </FormControl>
              <FormDescription>
                {formatCurrency(_balance as number)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending ? "Saving ..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default AccountForm;
