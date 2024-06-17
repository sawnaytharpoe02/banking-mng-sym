import React from "react";
import Form from "@/components/ui/customer/customer-form";
import db from "@/db";

const EditCustomerPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const customer = await db.user.findUnique({ where: { id } });

  if (!customer)
    return (
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">No Customer Found for that ID.</h1>
      </div>
    );

  return (
    <div className="p-8 max-w-md space-y-2">
      <h1 className="text-2xl">Edit Customer</h1>
      <p>Make changes to the customer here. Click save when you're done.</p>
      <Form customer={customer} />
    </div>
  );
};

export default EditCustomerPage;
