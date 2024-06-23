import React from "react";
import TranscationHistoryForm from "@/components/ui/reports/transcation-history/form";
import PageHeader from "@/app/_components/PageHeader";
import TransactionHistoryTable from "@/components/ui/reports/transcation-history/table";
import PagePagination from "@/app/_components/PagePagination";
import { fetchTransactionHistoryPages } from "@/lib/data";
import { Suspense } from "react";
import { TransactionHistoryTableSkeleton } from "@/components/ui/skeletons";

const TransactionHistoryPage = async ({
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

  return (
    <div>
      <PageHeader>Transcation History</PageHeader>
      <TranscationHistoryForm fromDate={fromDate} toDate={toDate} />
      <div className="mt-10 h-80 overflow-y-auto">
        <Suspense
          key={currentPage + itemsPerPage}
          fallback={<TransactionHistoryTableSkeleton />}>
          <TransactionHistoryTable
            fromDate={fromDate}
            toDate={toDate}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>
      </div>
      <PagePagination totalPages={totalPages} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default TransactionHistoryPage;
