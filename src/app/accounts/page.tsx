import React from "react";
import AccountTable from "@/components/ui/account/table";
import PageHeader from "../_components/PageHeader";
import { Input } from "@/components/ui/input";
import { fetchedAccountData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AccountListPage = async () => {
  const accountData = await fetchedAccountData();

  return (
    <div>
      <PageHeader>Account List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Search ..." className="w-60" />
        <Button asChild>
          <Link href="/accounts/create">Create Account</Link>
        </Button>
      </div>
      <AccountTable data={accountData} />
    </div>
  );
};

export default AccountListPage;
