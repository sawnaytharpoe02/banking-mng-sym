import React from "react";
import { cn } from "@/lib/utils";

const PageHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div>
      <p className={cn("text-4xl font-medium mb-6", className)}>{children}</p>
    </div>
  );
};

export default PageHeader;
