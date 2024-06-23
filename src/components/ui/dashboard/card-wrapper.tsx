import { formatNumber } from "@/lib/utils";
import DashboardAnalyticsCard from "./dashboard-analytics-card";
import {
  getRevenueData,
  getCustomersData,
  getAccountsData,
  getTransactionsData,
} from "@/lib/data";
import { wait } from "@/lib/utils";

const CardWrapper = async () => {
  await wait(2000);

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
        amount={formatNumber(revenue.totalRevenue)}
        percentage={revenue.percentageChange.toFixed(2)}
        type="revenue"
      />

      <DashboardAnalyticsCard
        title="New Customers"
        amount={customers.newUsers}
        percentage={customers.userPercentageChange.toFixed(2)}
        type="customer"
      />

      <DashboardAnalyticsCard
        title="Total Accounts"
        amount={accounts.totalAccounts}
        percentage={accounts.accountsPercentageChange.toFixed(2)}
        type="account"
      />

      <DashboardAnalyticsCard
        title="Transactions"
        amount={transactions.totalTransactions}
        percentage={transactions.transactionsPercentageChange.toFixed(2)}
        type="transaction"
      />
    </>
  );
};

export default CardWrapper;
