"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center  space-y-4">
        <h2 className="text-center">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </main>
  );
}
