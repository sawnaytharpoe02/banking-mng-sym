"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StateFormSchema } from "@/schemas";
import { createState } from "@/app/_actions/state";

const StateForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [message, setMessage] = useState<string | undefined>("");
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof StateFormSchema>>({
    resolver: zodResolver(StateFormSchema),
    defaultValues: {
      stateCode: "",
      stateName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof StateFormSchema>) => {
    setError("");
    setMessage("");

    startTransition(() => {
      createState(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setMessage(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="stateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="state code"
                  {...field}
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stateName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="state name"
                  {...field}
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending ? "Creating ..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default StateForm;
