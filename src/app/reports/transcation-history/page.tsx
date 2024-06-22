import React from "react";
import TranscationHistoryForm from "@/components/ui/reports/transcation-history/form";
import PageHeader from "@/app/_components/PageHeader";
import TranscationHistoryTable from "@/components/ui/reports/transcation-history/table";
import { fetchedTranscationHistoryData } from "@/lib/data";
import PagePagination from "@/app/_components/PagePagination";
import { fetchTransactionHistoryPages } from "@/lib/data";

const TranscationHistoryPage = async ({
  searchParams,
}: {
  searchParams?: {
    from?: string;
    to?: string;
    page?: string;
    count?: string;
  };
}) => {
  const fromDate = searchParams?.from || "";
  const toDate = searchParams?.to || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.count) || 6;

  const totalPages = await fetchTransactionHistoryPages(
    fromDate,
    toDate,
    itemsPerPage
  );

  const transactionHistoryData = await fetchedTranscationHistoryData(
    fromDate,
    toDate,
    currentPage,
    itemsPerPage
  );


  return (
    <div>
      <PageHeader>Transcation History</PageHeader>
      <TranscationHistoryForm />
      <div className="mt-10 h-80 overflow-y-auto">
        <TranscationHistoryTable data={transactionHistoryData} />
      </div>
      <div>
        <PagePagination totalPages={totalPages} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

export default TranscationHistoryPage;
