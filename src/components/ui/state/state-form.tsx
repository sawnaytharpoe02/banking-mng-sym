"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useEffect } from "react";
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
import { createState, updateState } from "@/app/_actions/state";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { State } from "@prisma/client";

type StateFormProps = {
  state?: State | null;
};

const StateForm = ({ state }: StateFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof StateFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(StateFormSchema),
    defaultValues: {
      stateCode: state?.stateCode || "",
      stateName: state?.stateName || "",
    },
  });

  useEffect(() => {
    localStorage.setItem("isFormModified", form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  const onSubmit = (values: z.infer<typeof StateFormSchema>) => {
    startTransition(async () => {
      try {
        let data;
        if (!state) {
          data = await createState(values);
        } else {
          data = await updateState(values, state.id);
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
          if (data?.redirect) router.push(data?.redirect);
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
          name="stateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="state code"
                  {...field}
                  value={field.value || ""}
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
          name="stateName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="state name"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled={pending}
                />
              </FormControl>
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

export default StateForm;
