import { formatNumber } from "@/lib/utils";
import DashboardAnalyticsCard from "./dashboard-analytics-card";
import {
  getRevenueData,
  getCustomersData,
  getAccountsData,
  getTransactionsData,
} from "@/lib/data/dashboard";

const CardWrapper = async () => {
  const [revenue, customers, accounts, transactions] = await Promise.all([
    getRevenueData(),
    getCustomersData(),
    getAccountsData(),
    getTransactionsData(),
  ]);

  return (
    <>
      <DashboardAnalyticsCard
        title="Total Revenue"
        amount={formatNumber(revenue?.totalRevenue ?? 0)}
        percentage={revenue?.percentageChange.toFixed(2) ?? ""}
        type="revenue"
      />

      <DashboardAnalyticsCard
        title="New Customers"
        amount={customers?.newUsers ?? 0}
        percentage={customers?.userPercentageChange.toFixed(2) ?? ""}
        type="customer"
      />

      <DashboardAnalyticsCard
        title="Total Accounts"
        amount={accounts?.totalAccounts ?? 0}
        percentage={accounts?.accountsPercentageChange.toFixed(2) ?? ""}
        type="account"
      />

      <DashboardAnalyticsCard
        title="Transactions"
        amount={transactions?.totalTransactions ?? 0}
        percentage={transactions?.transactionsPercentageChange.toFixed(2) ?? ""}
        type="transaction"
      />
    </>
  );
};

export default CardWrapper;
