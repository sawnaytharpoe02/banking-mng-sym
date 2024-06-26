import React from "react";
import type { Metadata } from "next";
import AccountTable from "@/components/ui/account/table";
import PageHeader from "@/app/_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import Search from "@/components/ui/Search";
import PagePagination from "@/app/_components/PagePagination";
import { Suspense } from "react";
import { AccountTableSkeleton } from "@/components/ui/skeletons";
import { fetchAccountPages } from "@/lib/data/account";

export const metadata: Metadata = {
  title: "Accounts",
};

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
        <Search options="server" />
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
