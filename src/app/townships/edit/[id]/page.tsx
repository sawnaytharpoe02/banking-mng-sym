import React from "react";
import Form from "@/components/ui/townships/township-form";
import { fetchedAllStateData } from "@/lib/data/state";
import { getTownshipById } from "@/lib/data/township";

const EditTownshipPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [township, stateData] = await Promise.all([
    getTownshipById(id),
    fetchedAllStateData(),
  ]);

  if (!township)
    return (
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">No Township Found for that ID.</h1>
      </div>
    );

  return (
    <div className="p-8 w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Edit Township</h1>
        <p>Make changes to the Township here. Click save when you are done.</p>
      </div>
      <Form township={township} stateData={stateData} />
    </div>
  );
};

export default EditTownshipPage;
