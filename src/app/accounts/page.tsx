import React from "react";
import AccountTable from "@/components/ui/account/table";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import AppInputSearch from "@/components/ui/AppInputSearch";
import PagePagination from "../_components/PagePagination";
import { fetchAccountPages } from "@/lib/data";
import { Suspense } from "react";
import { AccountTableSkeleton } from "@/components/ui/skeletons";

const AccountListPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; count?: string };
}) => {
  const query = searchParams?.query?.toString() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.count) || 6;

  const totalPages = await fetchAccountPages(itemsPerPage, query);

  return (
    <div>
      <PageHeader>Account List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <AppInputSearch options="server" />
        <Button asChild>
          <Link href="/accounts/create">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create
          </Link>
        </Button>
      </div>
      <div className="h-80 overflow-y-auto">
        <Suspense key={query + currentPage} fallback={<AccountTableSkeleton />}>
          <AccountTable
            query={query}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>
      </div>
      <div className="mt-12">
        <PagePagination totalPages={totalPages} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

export default AccountListPage;
