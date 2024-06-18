import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/account/account-form";
import { fetchedCustomerData } from "@/lib/data";

const CreateAccountPage = async () => {
  const customerData = await fetchedCustomerData();

  return (
    <div>
      <PageHeader>Create Account</PageHeader>
      <Form customer={customerData} />
    </div>
  );
};

export default CreateAccountPage;
