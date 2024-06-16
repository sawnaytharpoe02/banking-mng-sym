import StateTable from "@/components/ui/state/table";
import PageHeader from "../_components/PageHeader";
import db from "@/db";
import React from "react";
import { Input } from "@/components/ui/input";
import GenerateStateButton from "@/components/ui/state/generate-state-btn";

async function fetchedStateData() {
  return await db.state.findMany({ orderBy: { created_at: "desc" } });
}

const StateListPage = async () => {
  const stateData = await fetchedStateData();

  return (
    <div>
      <PageHeader>State List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Search State" className="w-60" />
        <GenerateStateButton />
      </div>
      <StateTable data={stateData} />
    </div>
  );
};

export default StateListPage;
