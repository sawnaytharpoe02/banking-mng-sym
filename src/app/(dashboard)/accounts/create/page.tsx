import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/account/account-form";
import { fetchedAllCustomerData } from "@/lib/data/user";

const CreateAccountPage = async () => {
  const customerData = await fetchedAllCustomerData();

  return (
    <div>
      <PageHeader>Create Account</PageHeader>
      <Form customer={customerData} />
    </div>
  );
};

export default CreateAccountPage;
