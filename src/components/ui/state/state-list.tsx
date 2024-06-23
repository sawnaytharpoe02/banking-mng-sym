"use client";

import React, { useState } from "react";
import { State } from "@prisma/client";
import Search from "@/components/ui/Search";
import StateTable from "./table";

const StateList = ({ data }: { data: State[] | null }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredData = data?.filter((state) => {
    return (
      state.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.stateCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) as State[];

  return (
    <div>
      <div className="mb-6 -mt-10">
        <Search onSearch={handleSearch} options="client" />
      </div>
      <div className="h-80 overflow-y-auto">
        <StateTable data={filteredData} />
      </div>
    </div>
  );
};

export default StateList;
