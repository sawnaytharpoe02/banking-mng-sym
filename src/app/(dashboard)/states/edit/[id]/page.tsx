import React from "react";
import StateForm from "@/components/ui/state/state-form";
import { getStateById } from "@/lib/data/state";

const EditStatePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const state = await getStateById(id);

  if (!state)
    return (
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">No State Found for that ID.</h1>
      </div>
    );

  return (
    <div className="p-8 w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Edit State</h1>
        <p>Make changes to the State here. Click save when you are done.</p>
      </div>
      <StateForm state={state} />
    </div>
  );
};

export default EditStatePage;
