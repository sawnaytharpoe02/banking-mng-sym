import React from "react";
import CustomerTable from "@/components/ui/customer/table";
import PageHeader from "../_components/PageHeader";
import { Input } from "@/components/ui/input";
import { fetchedCustomerData } from "@/lib/data";
import GenerateCustomerButton from "@/components/ui/customer/generate-cusotmer-btn";

const CustomerListPage = async () => {
  const userData = await fetchedCustomerData();

  return (
    <div>
      <PageHeader>Customer List</PageHeader>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Search ..." className="w-60" />
        <GenerateCustomerButton />
      </div>
      <CustomerTable data={userData} />
    </div>
  );
};

export default CustomerListPage;
