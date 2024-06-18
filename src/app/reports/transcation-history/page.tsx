import React from "react";
import TranscationHistoryForm from "@/components/ui/reports/transcation-history/form";
import PageHeader from "@/app/_components/PageHeader";

const TranscationHistoryPage = () => {
  return (
    <div>
      <PageHeader>Transcation History</PageHeader>
      <TranscationHistoryForm />
    </div>
  );
};

export default TranscationHistoryPage;
