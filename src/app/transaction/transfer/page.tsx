import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/transcation/transfer-form";

export const metadata: Metadata = {
  title: "Transfer",
};

const TransferPage = () => {
  return (
    <div>
      <PageHeader>Transfer Transaction</PageHeader>
      <Form />
    </div>
  );
};

export default TransferPage;
