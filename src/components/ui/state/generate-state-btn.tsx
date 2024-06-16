"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { generateState } from "@/app/_actions/state";
import { toast } from "@/components/ui/use-toast";

const GenerateStateButton = () => {
  const [pending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await generateState()
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
      {pending ? "Generating ..." : "Generate State"}
    </Button>
  );
};

export default GenerateStateButton;
