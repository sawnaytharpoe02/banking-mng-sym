import React from "react";
import Form from "@/components/ui/customer/customer-form";
import {
  fetchedAllStateData,
  fetchedAllTownshipData,
  getCustomerById,
} from "@/lib/data";
import PageHeader from "@/app/_components/PageHeader";

const ViewCustomerPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [customer, stateData, townshipData] = await Promise.all([
    getCustomerById(id),
    fetchedAllStateData(),
    fetchedAllTownshipData(),
  ]);

  if (!customer)
    return (
      <div className="space-y-2">
        <PageHeader className="mb-0">View Customer</PageHeader>
        <p>No Customer Found for that ID.</p>
      </div>
    );

  return (
    <div>
      <div className="space-y-2 mb-6">
        <PageHeader className="mb-0">View Customer</PageHeader>
      </div>
      <Form
        viewForm
        customer={customer}
        stateData={stateData}
        townshipData={townshipData}
      />
    </div>
  );
};

export default ViewCustomerPage;
