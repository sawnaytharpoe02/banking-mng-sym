import React from "react";
import Link from "next/link";
import {
  Bell,
  Home,
  Box,
  LineChart,
  Users,
  UserRoundCog,
  MessageCircleWarning,
  Package2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SideLink from "./SideLink";
import SubmenuDropdown from "./SidebarSubmenuDropdown";

export interface ISidebarItems {
  title: string;
  href?: string;
  icon: React.ReactNode;
  subMenu?: { title: string; href: string }[];
}

const SidebarItems: ISidebarItems[] = [
  {
    title: "State",
    href: "/states",
    icon: <Home className="w-4 h-4" />,
  },
  {
    title: "Township",
    href: "/townships",
    icon: <Box className="w-4 h-4" />,
  },
  {
    title: "Customer",
    href: "/customers",
    icon: <Users className="w-4 h-4" />,
  },
  {
    title: "Account",
    href: "/accounts",
    icon: <UserRoundCog className="w-4 h-4" />,
  },
  {
    title: "Transaction",
    icon: <LineChart className="w-4 h-4" />,
    subMenu: [
      { title: "Transfer", href: "/transaction/transfer" },
      { title: "Withdraw", href: "/transaction/withdraw" },
      { title: "Deposit", href: "/transaction/deposit" },
    ],
  },
  {
    title: "Report",
    icon: <MessageCircleWarning className="w-4 h-4" />,
    subMenu: [
      { title: "Transaction History", href: "/reports/transaction-history" },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-[8vh] items-center border-b px-4 lg:h-[10vh] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Bank Inc</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1 py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {SidebarItems.map((item, i) => {
            if (item.href) {
              return (
                <SideLink
                  key={i + item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                />
              );
            } else {
              return <SubmenuDropdown index={i} item={item} />;
            }
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
