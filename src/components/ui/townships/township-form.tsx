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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { State, Township } from "@prisma/client";
import { TownshipFormSchema } from "@/schemas";
import { createTownship, updateTownship } from "@/app/_actions/township";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TownshipFormProps = {
  township?: Township | null;
  stateData: State[] | null;
};
const TownshipForm = ({ township, stateData }: TownshipFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof TownshipFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(TownshipFormSchema),
    defaultValues: {
      townshipCode: township?.townshipCode || "",
      townshipName: township?.townshipName || "",
      stateCode: township?.stateCode || "",
    },
  });

  useEffect(() => {
    localStorage.setItem("isFormModified", form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  const onSubmit = (values: z.infer<typeof TownshipFormSchema>) => {
    startTransition(async () => {
      try {
        let data;
        if (!township) {
          data = await createTownship(values);
        } else {
          data = await updateTownship(values, township.id);
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
          if (data?.redirect !== null) router.push(data.redirect);
          router.back();
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
          name="townshipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Township Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="township code"
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
          name="townshipName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Township Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="township name"
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
          name="stateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Code</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateData?.map((item) => (
                      <SelectItem key={item.id} value={item.stateCode}>
                        {item.stateName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default TownshipForm;
