import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/customer/customer-form";
import { fetchedAllStateData } from "@/lib/data/state";
import { fetchedAllTownshipData } from "@/lib/data/township";

const CreateCustomerPage = async () => {
  const [stateData, townshipData] = await Promise.all([
    fetchedAllStateData(),
    fetchedAllTownshipData(),
  ]);

  return (
    <div>
      <PageHeader>Register Customer</PageHeader>
      <Form stateData={stateData} townshipData={townshipData} />
    </div>
  );
};

export default CreateCustomerPage;
