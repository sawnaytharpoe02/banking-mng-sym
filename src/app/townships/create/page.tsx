import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/townships/township-form";
import { fetchedStateData } from "@/lib/data";

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
