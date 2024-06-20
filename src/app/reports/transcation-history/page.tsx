import React from "react";
import TranscationHistoryForm from "@/components/ui/reports/transcation-history/form";
import PageHeader from "@/app/_components/PageHeader";
import TranscationHistoryTable from "@/components/ui/reports/transcation-history/table";
import { fetchedTranscationHistoryData } from "@/lib/data";

const TranscationHistoryPage = async ({
  searchParams,
}: {
  searchParams?: {
    from?: string;
    to?: string;
  };
}) => {
  const fromDate = searchParams?.from || "";
  const toDate = searchParams?.to || "";

  const transactionHistoryData = await fetchedTranscationHistoryData(
    fromDate,
    toDate
  );
  return (
    <div>
      <PageHeader>Transcation History</PageHeader>
      <TranscationHistoryForm />
      <div className="mt-10 h-96 overflow-y-auto">
        <TranscationHistoryTable data={transactionHistoryData} />
      </div>
    </div>
  );
};

export default TranscationHistoryPage;
