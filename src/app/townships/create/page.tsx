import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/townships/township-form";
import { fetchedAllStateData } from "@/lib/data/state";

const CreateTownshipPage = async () => {
  const stateData = await fetchedAllStateData();

  return (
    <div>
      <PageHeader>Create Township</PageHeader>
      <Form stateData={stateData} />
    </div>
  );
};

export default CreateTownshipPage;
