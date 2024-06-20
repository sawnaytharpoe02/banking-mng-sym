"use client";

import { State } from "@prisma/client";
import React, { useState } from "react";
import AppInputSearch from "@/components/ui/AppInputSearch";
import StateTable from "./table";

const StateList = ({ data }: { data: State[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredData = data.filter((state) => {
    return state.stateName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="mb-4">
        <AppInputSearch onSearch={handleSearch} options="client" />
      </div>
      <div className="h-96 overflow-y-auto">
        <StateTable data={filteredData} />
      </div>
    </div>
  );
};

export default StateList;
