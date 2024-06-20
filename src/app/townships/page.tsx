import React from "react";
import TownshipTable from "@/components/ui/townships/table";
import PageHeader from "../_components/PageHeader";
import { Input } from "@/components/ui/input";
import GenerateTownshipButton from "@/components/ui/townships/generate-township-btn";
import db from "@/db";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

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
        <div className="flex items-center gap-4">
          <GenerateTownshipButton />
          <Button asChild>
            <Link href="/townships/create">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-96 overflow-y-auto">
        <TownshipTable data={townships} />
      </div>
    </div>
  );
};

export default TownshipListPage;
