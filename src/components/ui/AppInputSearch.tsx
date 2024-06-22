"use client";

import React from "react";
import { Input } from "./input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounceCallback } from "@/hooks/useDebounce";

interface AppInputSearchProps {
  onSearch?: (term: string) => void;
  options: "client" | "server";
}

const AppInputSearch = ({ onSearch, options }: AppInputSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebounceCallback((term: string) => {
    console.log("searching", term);
    if (options === "client") {
      if (onSearch) onSearch(term);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

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
