import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarItems } from "./Sidebar";
import SideLink from "./SideLink";
import SubmenuDropdown from "./SidebarSubmenuDropdown";

const SmallScreenSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium mt-10">
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
              return (
                <SubmenuDropdown key={i + item.title} index={i} item={item} />
              );
            }
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default SmallScreenSidebar;
