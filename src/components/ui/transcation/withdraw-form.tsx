"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { DepositWithDrawFormSchema } from "@/schemas";
import { withdrawTranscation } from "@/app/_actions/transcations";

const WithdrawForm = () => {
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DepositWithDrawFormSchema>>({
    resolver: zodResolver(DepositWithDrawFormSchema),
    defaultValues: {
      accountNumber: "",
      amount: undefined,
    },
  });

  const _amount = form.watch("amount");

  const onSubmit = (values: z.infer<typeof DepositWithDrawFormSchema>) => {
    startTransition(async () => {
      try {
        const data = await withdrawTranscation(values);

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
        }
      } catch (error) {
        toast({ description: "Something went wrong!" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="account number to withdraw"
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

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="transfer amount"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  disabled={pending}
                />
              </FormControl>
              <FormDescription>
                {formatCurrency(_amount as number)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={pending} type="submit">
          {pending ? "Withdrawing ..." : "Withdraw"}
        </Button>
      </form>
    </Form>
  );
};

export default WithdrawForm;
