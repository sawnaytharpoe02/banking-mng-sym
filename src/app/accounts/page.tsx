import React from "react";
import AccountTable from "@/components/ui/account/table";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import AppInputSearch from "@/components/ui/AppInputSearch";

const AccountListPage = ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const query = searchParams?.query?.toString() || "";

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
      <div className="h-96 overflow-y-auto">
        <AccountTable query={query} />
      </div>
    </div>
  );
};

export default AccountListPage;
