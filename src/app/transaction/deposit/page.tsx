import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/transcation/deposit-form";

export const metadata: Metadata = {
  title: "Deposit",
};

const DepositPage = () => {
  return (
    <div>
      <PageHeader>Deposit</PageHeader>
      <Form />
    </div>
  );
};

export default DepositPage;
