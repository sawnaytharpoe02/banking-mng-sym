import React from "react";
import Form from "@/components/ui/account/account-form";
import { getAccountById } from "@/lib/data/account";
import { fetchedAllCustomerData } from "@/lib/data/user";

const EditAccountPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [account, customerData] = await Promise.all([
    getAccountById(id),
    fetchedAllCustomerData(),
  ]);

  if (!account)
    return (
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">No Account Found for that ID.</h1>
      </div>
    );

  return (
    <div className="p-8 w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Edit Account</h1>
        <p>
          Make changes to the Account info here. Click save when you are done.
        </p>
      </div>
      <Form account={account} customer={customerData} />
    </div>
  );
};

export default EditAccountPage;
