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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { State, Township, User } from "@prisma/client";
import { CustomerFormSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser, updateUser } from "@/app/_actions/customer";

type CustomerFormProps = {
  customer?: User | null;
  stateData: State[] | null;
  townshipData: Township[] | null;
};

const CustomerForm = ({
  customer,
  stateData,
  townshipData,
}: CustomerFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [selectedState, setSelectedState] = useState<string>("");
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CustomerFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      customerName: customer?.customerName || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      nrc: customer?.nrc || "",
      address: customer?.address || "",
      townshipCode: customer?.townshipCode || "",
      stateCode: customer?.stateCode || "",
    },
  });

  const townshipsWithState = townshipData?.filter(
    (item) => item.stateCode === selectedState
  );

  const onSubmit = (values: z.infer<typeof CustomerFormSchema>) => {
    startTransition(async () => {
      try {
        let data;
        if (!customer) {
          data = await createUser(values);
        } else {
          data = await updateUser(values, customer.id);
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
          if (data?.redirect !== null) {
            router.push(data.redirect);
          } else {
            router.back();
          }
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
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="customer name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="phone"
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
          name="nrc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NRC</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="nrc"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your address here"
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
              <FormLabel>State</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedState(value);
                  }}>
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

        <FormField
          control={form.control}
          name="townshipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Township</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your township" />
                  </SelectTrigger>
                  <SelectContent>
                    {townshipsWithState?.length ?? 0 > 0 ? (
                      townshipsWithState?.map((item) => (
                        <SelectItem key={item.id} value={item.townshipCode}>
                          {item.townshipName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="#">Township is invalid.</SelectItem>
                    )}
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

export default CustomerForm;
