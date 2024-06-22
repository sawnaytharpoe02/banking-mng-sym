import React from "react";
import SmallScreenSidebar from "./SmallScreenSidebar";
import LeftSideSearchInput from "./LeftSideSearchInput";
import RightSideMenuDropdown from "./RightSideMenuDropdown";

const Topbar = () => {
  return (
    <header className="flex items-center h-[8vh] md:h-[10vh] gap-4 border-b px-4 lg:px-6">
      <SmallScreenSidebar />
      <LeftSideSearchInput />
      <RightSideMenuDropdown />
    </header>
  );
};

export default Topbar;
