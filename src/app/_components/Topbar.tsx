import React from "react";
import SmallScreenSidebar from "./SmallScreenSidebar";
import LeftSideSearchInput from "./LeftSideSearchInput";
import RightSideMenuDropdown from "./RightSideMenuDropdown";

const Topbar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SmallScreenSidebar />
      <LeftSideSearchInput />
      <RightSideMenuDropdown />
    </header>
  );
};

export default Topbar;
