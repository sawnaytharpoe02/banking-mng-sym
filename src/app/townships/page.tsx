import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import GenerateTownshipButton from "@/components/ui/townships/generate-township-btn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import TownshipTable from "@/components/ui/townships/table";
import AppInputSearch from "@/components/ui/AppInputSearch";
import PagePagination from "@/app/_components/PagePagination";
import { fetchTownshipPages } from "@/lib/data";
import { Suspense } from "react";
import { TownshipTableSkeleton } from "@/components/ui/skeletons";

const TownshipListPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; count?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.count) || 6;

  const totalPages = await fetchTownshipPages(itemsPerPage, query);

  return (
    <div>
      <PageHeader>Township List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <AppInputSearch options="server" />
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
      <div className="h-80 overflow-y-auto">
        <Suspense
          key={query + currentPage}
          fallback={<TownshipTableSkeleton />}>
          <TownshipTable
            query={query}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>
        {/* <TownshipTableSkeleton /> */}
      </div>
      <div className="mt-12">
        <PagePagination totalPages={totalPages} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

export default TownshipListPage;
