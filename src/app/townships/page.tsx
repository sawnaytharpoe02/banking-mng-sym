import React from "react";
import TownshipTable from "@/components/ui/townships/table";
import PageHeader from "../_components/PageHeader";
import { Input } from "@/components/ui/input";
import GenerateTownshipButton from "@/components/ui/townships/generate-township-btn";
import db from "@/db";

async function fetchedTownshipData() {
  return await db.township.findMany({ orderBy: { created_at: "desc" } });
}

const TownshipListPage = async () => {
  const townships = await fetchedTownshipData();

  return (
    <div>
      <PageHeader>Township List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Search Townships" className="w-60" />
        <GenerateTownshipButton />
      </div>
      <TownshipTable data={townships} />
    </div>
  );
};

export default TownshipListPage;
