import React from "react";
import StateForm from "@/components/ui/state/state-form";
import db from "@/db";

const EditStatePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const state = await db.state.findUnique({ where: { id } });

  if (!state)
    return (
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">No User Found for that ID.</h1>
      </div>
    );

  return (
    <div className="p-8 max-w-md space-y-2">
      <h1 className="text-2xl">Edit State</h1>
      <p>Make changes to the State here. Click save when you're done.</p>
      <StateForm state={state} />
    </div>
  );
};

export default EditStatePage;
