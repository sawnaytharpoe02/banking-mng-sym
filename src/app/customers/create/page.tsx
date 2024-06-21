import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/customer/customer-form";
import { fetchedStateData, fetchedTownshipData } from "@/lib/data";

const CreateCustomerPage = async () => {
  const [stateData, townshipData] = await Promise.all([
    fetchedStateData(),
    fetchedTownshipData(),
  ]);

  return (
    <div>
      <PageHeader>Register Customer</PageHeader>
      <Form stateData={stateData} townshipData={townshipData} />
    </div>
  );
};

export default CreateCustomerPage;
