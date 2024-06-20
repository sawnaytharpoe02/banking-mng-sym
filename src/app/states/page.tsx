import React from "react";
import StateTable from "@/components/ui/state/table";
import PageHeader from "../_components/PageHeader";
import db from "@/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GenerateStateButton from "@/components/ui/state/generate-state-btn";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

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
        <div className="flex items-center gap-4">
          <GenerateStateButton />
          <Button asChild>
            <Link href="/states/create">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-96 overflow-y-auto">
        <StateTable data={stateData} />
      </div>
    </div>
  );
};

export default StateListPage;
