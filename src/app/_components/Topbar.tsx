import React from "react";
import SmallScreenSidebar from "./SmallScreenSidebar";
import LeftSideSearchInput from "./LeftSideSearchInput";
import RightSideMenuDropdown from "./RightSideMenuDropdown";

const Topbar = () => {
  return (
    <header className="flex items-center h-[8vh] gap-4 border-b bg-muted/40 px-4 lg:h-[10vh] lg:px-6">
      <SmallScreenSidebar />
      <LeftSideSearchInput />
      <RightSideMenuDropdown />
    </header>
  );
};

export default Topbar;
