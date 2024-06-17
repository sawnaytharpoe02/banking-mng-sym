import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/townships/township-form";
import db from "@/db";

export const fetchedStateData = async () => {
  return await db.state.findMany({
    select: {
      id: true,
      stateCode: true,
      stateName: true,
    },
    orderBy: { created_at: "desc" },
  });
};

const CreateTownshipPage = async () => {
  const stateData = await fetchedStateData();
  return (
    <div>
      <PageHeader>Create Township</PageHeader>
      <Form stateData={stateData} />
    </div>
  );
};

export default CreateTownshipPage;
