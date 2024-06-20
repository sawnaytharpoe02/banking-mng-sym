import React from "react";
import AccountTable from "@/components/ui/account/table";
import PageHeader from "../_components/PageHeader";
import { Input } from "@/components/ui/input";
import { fetchedAccountData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

const AccountListPage = async () => {
  const accountData = await fetchedAccountData();

  return (
    <div>
      <PageHeader>Account List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Search ..." className="w-60" />
        <Button asChild>
          <Link href="/accounts/create">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Account
          </Link>
        </Button>
      </div>
      <div className="h-96 overflow-y-auto">
        <AccountTable data={accountData} />
      </div>
    </div>
  );
};

export default AccountListPage;
