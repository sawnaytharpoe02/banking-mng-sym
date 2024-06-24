"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SideLinkProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

const SideLink = ({ title, href, icon }: SideLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center text-sm gap-3 rounded-lg px-3 py-2 my-1 text-muted-foreground transition-all hover:text-primary",
        { "text-primary bg-muted": pathname === href }
      )}>
      {icon}
      {title}
    </Link>
  );
};

export default SideLink;
