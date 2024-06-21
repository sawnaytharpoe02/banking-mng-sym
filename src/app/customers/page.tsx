import React from "react";
import CustomerTable from "@/components/ui/customer/table";
import PageHeader from "../_components/PageHeader";
import GenerateCustomerButton from "@/components/ui/customer/generate-cusotmer-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import AppInputSearch from "@/components/ui/AppInputSearch";

const CustomerListPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const query = searchParams?.query?.toString() || "";
  return (
    <div>
      <PageHeader>Customer List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <AppInputSearch options="server" />
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
      <div className="h-96 overflow-y-auto">
        <CustomerTable query={query} />
      </div>
    </div>
  );
};

export default CustomerListPage;
