import React from "react";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/state/state-form";
import { getStateById } from "@/lib/data/state";

const EditState = async ({ params: { id } }: { params: { id: string } }) => {
  const state = await getStateById(id);

  if (!state)
    return (
      <Modal
        dialogTitle="Not Found"
        dialogDescription="No State found for that ID."></Modal>
    );

  return (
    <Modal
      dialogTitle="Edit State"
      dialogDescription="Make changes to the State here. Click save when you're done.">
      <div className="p-8 max-w-md space-y-2">
        <Form state={state} />
      </div>
    </Modal>
  );
};

export default EditState;
