import db from "@/db";
import React from "react";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/townships/township-form";
import { fetchedStateData, getTownshipById } from "@/lib/data";

const EditTownship = async ({ params: { id } }: { params: { id: string } }) => {
  const [township, stateData] = await Promise.all([
    getTownshipById(id),
    fetchedStateData(),
  ]);

  if (!township)
    return (
      <Modal
        dialogTitle="Not Found"
        dialogDescription="No Township found for that ID."></Modal>
    );

  return (
    <Modal
      dialogTitle="Edit Township"
      dialogDescription="Make changes to the Township here. Click save when you're done.">
      <div className="p-8 max-w-md space-y-2">
        <Form township={township} stateData={stateData} />
      </div>
    </Modal>
  );
};

export default EditTownship;
