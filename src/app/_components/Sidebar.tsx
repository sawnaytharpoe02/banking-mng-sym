import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sidebarItems = [
  {
    menuTitle: "State",
    subMenu: [
      { title: "State List", href: "/state/list" },
      { title: "Create State", href: "/state/create" },
    ],
  },
  {
    menuTitle: "Township",
    subMenu: [
      { title: "Township List", href: "/township/list" },
      { title: "Create Township", href: "/township/create" },
    ],
  },
  {
    menuTitle: "Customer",
    subMenu: [
      { title: "Customer List", href: "/customer/list" },
      { title: "Create Customer", href: "/customer/create" },
      { title: "Account List", href: "/account/list" },
    ],
  },
  {
    menuTitle: "Transcation",
    subMenu: [
      { title: "Transfer", href: "/transcation/transfer" },
      { title: "Withdraw", href: "/transcation/withdraw" },
      { title: "Deposit", href: "/transcation/deposit" },
    ],
  },
  {
    menuTitle: "Report",
    subMenu: [
      { title: "Transcation History", href: "/report/transcation-history" },
    ],
  },
];

const Sidebar = () => {
  return (
    <div>
      <div className="h-16 flex items-center px-5">
        <p className="text-3xl font-bold">BankMS</p>
      </div>
      <Accordion type="multiple">
        {sidebarItems.map((item, i) => {
          return (
            <AccordionItem
              key={`${i}_${item.menuTitle}`}
              value={`value-${i + 1}`}>
              <AccordionTrigger>{item.menuTitle}</AccordionTrigger>
              <AccordionContent className="space-y-3">
                {item.subMenu.map((subItem, j) => (
                  <SideLink key={j} href={subItem.href} title={subItem.title} />
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Sidebar;

type SideLinkProps = {
  href: string;
  title: string;
};
const SideLink = ({ title, href }: SideLinkProps) => {
  return (
    <div>
      <Link href={href}>{title}</Link>
    </div>
  );
};
