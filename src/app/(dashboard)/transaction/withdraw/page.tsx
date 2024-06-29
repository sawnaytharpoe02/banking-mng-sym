import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/app/_components/PageHeader";
import Form from "@/components/ui/transcation/withdraw-form";

export const metadata: Metadata = {
  title: "Withdraw",
};

const WithdrawPage = () => {
  return (
    <div>
      <PageHeader>Withdraw</PageHeader>
      <Form />
    </div>
  );
};

export default WithdrawPage;
