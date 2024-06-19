"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ISidebarItems } from "./Sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SubmenuDropdownProps = {
  item: ISidebarItems;
  index: number;
};

const SubmenuDropdown = ({ item, index }: SubmenuDropdownProps) => {
  const pathname = usePathname();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value={`item-${index + 1}`}>
        <AccordionTrigger
          hideIcon
          className={cn(
            "flex items-center justify-normal gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary [&[data-state=open]>svg]:rotate-0",
            {
              "text-primary bg-muted": pathname
                .split("/")[1]
                .includes(item.title.toLowerCase()),
            }
          )}>
          {item.icon}
          {item.title}
        </AccordionTrigger>
        <AccordionContent>
          {item.subMenu?.map((subItem, j) => (
            <div
              key={`${index}_${j}_${subItem.title}`}
              className={cn(
                "rounded-lg text-muted-foreground hover:text-primary ps-10 py-2",
                {
                  "text-primary": subItem.href === pathname,
                }
              )}>
              <Link href={subItem.href}>{subItem.title}</Link>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SubmenuDropdown;
