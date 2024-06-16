"use client";

import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { generateTownship } from "@/app/_actions/township";

const GenerateTownshipButton = () => {
  const [pending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await generateTownship()
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
      {pending ? "Generating ..." : "Generate Township"}
    </Button>
  );
};

export default GenerateTownshipButton;
