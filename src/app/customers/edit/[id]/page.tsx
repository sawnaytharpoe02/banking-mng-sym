import React from "react";
import Form from "@/components/ui/customer/customer-form";
import PageHeader from "@/app/_components/PageHeader";
import { getCustomerById } from "@/lib/data/user";
import { fetchedAllStateData } from "@/lib/data/state";
import { fetchedAllTownshipData } from "@/lib/data/township";

const EditCustomerPage = async ({
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
        <PageHeader className="mb-0">Edit Customer</PageHeader>
        <p>No Customer Found for that ID.</p>
      </div>
    );

  return (
    <div>
      <div className="space-y-2 mb-6">
        <PageHeader className="mb-0">Edit Customer</PageHeader>
        <p>Make changes to the customer here. Click save when you are done.</p>
      </div>
      <Form
        customer={customer}
        stateData={stateData}
        townshipData={townshipData}
      />
    </div>
  );
};

export default EditCustomerPage;
