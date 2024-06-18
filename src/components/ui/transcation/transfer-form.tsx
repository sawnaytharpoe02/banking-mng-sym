"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TransferFormSchema } from "@/schemas";
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
import { transferTranscation } from "@/app/_actions/transcations";

const TransferForm = () => {
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof TransferFormSchema>>({
    resolver: zodResolver(TransferFormSchema),
    defaultValues: {
      transferFromAcc: "",
      transferToAcc: "",
      amount: undefined,
    },
  });

  const _amount = form.watch("amount");

  const onSubmit = (values: z.infer<typeof TransferFormSchema>) => {
    startTransition(async () => {
      try {
        const data = await transferTranscation(values);

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
          name="transferFromAcc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer From</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="transfer from account number"
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
          name="transferToAcc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer To</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="transfer to account number"
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
          {pending ? "Transfering ..." : "Transfer"}
        </Button>
      </form>
    </Form>
  );
};

export default TransferForm;
