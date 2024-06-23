import React from "react";
import TransactionsChart from "@/components/ui/dashboard/transactions-chart";
import RecentCustomersChart from "@/components/ui/dashboard/recent-customers-chart";
import CardWrapper from "@/components/ui/dashboard/card-wrapper";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CardWrapper />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <TransactionsChart />
          <RecentCustomersChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
