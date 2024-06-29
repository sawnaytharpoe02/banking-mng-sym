import React, { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/app/_components/PageHeader";
import { Button } from "@/components/ui/button";
import GenerateStateButton from "@/components/ui/state/generate-state-btn";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import StateList from "@/components/ui/state/state-list";
import { fetchedAllStateData } from "@/lib/data/state";
import { StateTableSkeleton } from "@/components/ui/skeletons";

export const metadata: Metadata = {
  title: "States",
};

const StateListPage = async () => {
  const stateData = await fetchedAllStateData();

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
      <Suspense fallback={<StateTableSkeleton />}>
        <StateList data={stateData} />
      </Suspense>
    </div>
  );
};

export default StateListPage;
