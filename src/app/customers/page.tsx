import React from "react";
import CustomerTable from "@/components/ui/customer/table";
import PageHeader from "../_components/PageHeader";
import { Input } from "@/components/ui/input";
import GenerateStateButton from "@/components/ui/state/generate-state-btn";
import { fetchedCustomerData } from "@/lib/data";

const CustomerListPage = async () => {
  const userData = await fetchedCustomerData();

  return (
    <div>
      <PageHeader>Customer List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Search ..." className="w-60" />
        <GenerateStateButton />
      </div>
      <CustomerTable data={userData} />
    </div>
  );
};

export default CustomerListPage;
