import React from "react";
import type { Metadata } from "next";
import CustomerTable from "@/components/ui/customer/table";
import PageHeader from "@/app/_components/PageHeader";
import GenerateCustomerButton from "@/components/ui/customer/generate-cusotmer-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import Search from "@/components/ui/Search";
import PagePagination from "@/app/_components/PagePagination";
import { Suspense } from "react";
import { CustomerTableSkeleton } from "@/components/ui/skeletons";
import { fetchCustomerPages } from "@/lib/data/user";

export const metadata: Metadata = {
  title: "Customers",
};

const CustomerListPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; count?: string };
}) => {
  const query = searchParams?.query?.toString() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.count) || 6;

  const totalPages = await fetchCustomerPages(itemsPerPage, query);

  return (
    <div>
      <PageHeader>Customer List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Search options="server" />
        <div className="flex items-center gap-4">
          <GenerateCustomerButton />
          <Button asChild>
            <Link href="/customers/create">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-80 overflow-y-auto">
        <Suspense
          key={query + currentPage}
          fallback={<CustomerTableSkeleton />}>
          <CustomerTable
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

export default CustomerListPage;
