"use client";

import React from "react";
import { Input } from "./input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface AppInputSearchProps {
  onSearch?: (term: string) => void;
  options: "client" | "server";
}

const AppInputSearch = ({ onSearch, options }: AppInputSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    if (options === "client") {
      if (onSearch) onSearch(term);
      return;
    }
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      type="search"
      placeholder="Search ..."
      className="w-60"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={
        options === "server" ? searchParams.get("query")?.toString() || "" : ""
      }
    />
  );
};

export default AppInputSearch;
