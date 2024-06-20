"use client";

import React from "react";
import { Input } from "./input";

interface AppInputSearchProps {
  onSearch: (term: string) => void;
}

const AppInputSearch = ({ onSearch }: AppInputSearchProps) => {
  const handleSearch = (term: string) => {
    onSearch(term);
  };
  return (
    <Input
      type="search"
      placeholder="Search ..."
      className="w-60"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default AppInputSearch;
