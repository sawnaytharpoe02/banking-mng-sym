import React from "react";
import PageHeader from "../_components/PageHeader";
import GenerateTownshipButton from "@/components/ui/townships/generate-township-btn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import TownshipTable from "@/components/ui/townships/table";
import AppInputSearch from "@/components/ui/AppInputSearch";

const TownshipListPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const query = searchParams?.query || "";

  return (
    <div>
      <PageHeader>Township List</PageHeader>
      <div className="flex items-center justify-end">
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
      <div>
        <div className="mb-4">
          <AppInputSearch options="server" />
        </div>
        <div className="h-96 overflow-y-auto">
          <TownshipTable query={query} />
        </div>
      </div>
    </div>
  );
};

export default TownshipListPage;
