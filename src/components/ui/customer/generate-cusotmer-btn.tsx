"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { generateUser } from "@/app/_actions/customer";

const GenerateCustomerButton = () => {
  const [pending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await generateUser()
        .then((data) => {
          if (data?.error) {
            toast({
              variant: "destructive",
              description: data?.error,
            });
          } else {
            toast({
              description: data?.success,
            });
          }
        })
        .catch((_err) => toast({ description: "Something went wrong." }));
    });
  };
  return (
    <Button onClick={handleClick} disabled={pending}>
      {pending ? "Generating ..." : "Generate Customer"}
    </Button>
  );
};

export default GenerateCustomerButton;
