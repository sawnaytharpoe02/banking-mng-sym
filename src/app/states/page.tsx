import React from "react";
import PageHeader from "../_components/PageHeader";
import db from "@/db";
import { Button } from "@/components/ui/button";
import GenerateStateButton from "@/components/ui/state/generate-state-btn";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import StateList from "@/components/ui/state/state-list";

async function fetchedStateData() {
  return await db.state.findMany({ orderBy: { created_at: "desc" } });
}

const StateListPage = async () => {
  const stateData = await fetchedStateData();

  return (
    <div>
      <PageHeader>State List</PageHeader>
      <div className="flex items-center justify-end">
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
      <StateList data={stateData}/>
    </div>
  );
};

export default StateListPage;
