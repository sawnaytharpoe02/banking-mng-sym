import React from "react";
import Form from "@/components/ui/townships/township-form";
import { fetchedStateData } from "../../create/page";
import db from "@/db";

const EditTownshipPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [township, stateData] = await Promise.all([
    db.township.findUnique({ where: { id } }),
    fetchedStateData(),
  ]);

  if (!township)
    return (
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">No Township Found for that ID.</h1>
      </div>
    );

  return (
    <div className="p-8 max-w-md space-y-2">
      <h1 className="text-2xl">Edit Township</h1>
      <p>Make changes to the Township here. Click save when you're done.</p>
      <Form township={township} stateData={stateData} />
    </div>
  );
};

export default EditTownshipPage;
