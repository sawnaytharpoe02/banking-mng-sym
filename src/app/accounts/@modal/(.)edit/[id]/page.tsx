import React from "react";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/account/account-form";
import { getAccountById, fetchedCustomerData } from "@/lib/data";

const EditAccount = async ({ params: { id } }: { params: { id: string } }) => {
    const [account, customerData] = await Promise.all([
      getAccountById(id),
      fetchedCustomerData(),
    ]);

  if (!account)
    return (
      <Modal
        dialogTitle="Not Found"
        dialogDescription="No Account found for that ID."></Modal>
    );

  return (
    <Modal
      dialogTitle="Edit Account"
      dialogDescription="Make changes to the Account Info here. Click save when you're done.">
      <div className="p-8 max-w-md space-y-2">
        <Form account={account} customer={customerData} />
      </div>
    </Modal>
  );
};

export default EditAccount;
