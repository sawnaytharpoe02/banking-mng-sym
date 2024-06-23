import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db";
import { formatCurrency, formatNumber } from "@/lib/utils";

async function getRevenueData() {
  // Get the first and last day of the current month
  const startOfCurrentMonth = new Date(new Date().setDate(1));
  const endOfCurrentMonth = new Date(
    new Date(startOfCurrentMonth).setMonth(startOfCurrentMonth.getMonth() + 1)
  );

  // Get the first and last day of the previous month
  const startOfPreviousMonth = new Date(
    new Date().setMonth(new Date().getMonth() - 1)
  );
  startOfPreviousMonth.setDate(1);
  const endOfPreviousMonth = new Date(
    new Date(startOfPreviousMonth).setMonth(startOfPreviousMonth.getMonth() + 1)
  );

  // Calculate the total balance for the current month
  const currentMonthTotalBalance = await db.account.aggregate({
    _sum: {
      balance: true,
    },
    where: {
      created_at: {
        gte: startOfCurrentMonth,
        lt: endOfCurrentMonth,
      },
    },
  });

  // Calculate the total balance for the previous month
  const previousMonthTotalBalance = await db.account.aggregate({
    _sum: {
      balance: true,
    },
    where: {
      created_at: {
        gte: startOfPreviousMonth,
        lt: endOfPreviousMonth,
      },
    },
  });

  // Calculate the percentage change
  const currentTotal = currentMonthTotalBalance._sum.balance || 0;
  const previousTotal = previousMonthTotalBalance._sum.balance || 0;
  const percentageChange = previousTotal
    ? ((currentTotal - previousTotal) / previousTotal) * 100
    : 100;

  return {
    totalRevenue: currentTotal,
    percentageChange,
  };
}

async function getCustomersData() {
  const newUsers = await db.user.count({
    where: {
      created_at: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  const previousMonthUsers = await db.user.count({
    where: {
      created_at: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  const userPercentageChange = previousMonthUsers
    ? ((newUsers - previousMonthUsers) / previousMonthUsers) * 100
    : 100;

  return {
    newUsers,
    userPercentageChange,
  };
}

async function getAccountsData() {
  const totalAccounts = await db.account.count();

  const previousMonthAccounts = await db.account.count({
    where: {
      created_at: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  const accountsPercentageChange = previousMonthAccounts
    ? ((totalAccounts - previousMonthAccounts) / previousMonthAccounts) * 100
    : 100;

  return {
    totalAccounts,
    accountsPercentageChange,
  };
}

async function getTransactionsData() {
  const totalTransactions = await db.transactionHistory.count();

  const previousMonthTransactions = await db.transactionHistory.count({
    where: {
      created_at: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  const transactionsPercentageChange = previousMonthTransactions
    ? ((totalTransactions - previousMonthTransactions) /
        previousMonthTransactions) *
      100
    : 100;

  return {
    totalTransactions,
    transactionsPercentageChange,
  };
}

const Dashboard = async () => {
  const [revenue, customers, accounts, transactions] = await Promise.all([
    getRevenueData(),
    getCustomersData(),
    getAccountsData(),
    getTransactionsData(),
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DashboardAnalyticsCard
            title="Total Revenue"
            amount={formatNumber(revenue.totalRevenue)}
            percentage={revenue.percentageChange.toFixed(2)}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />

          <DashboardAnalyticsCard
            title="New Customers"
            amount={customers.newUsers}
            percentage={customers.userPercentageChange.toFixed(2)}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />

          <DashboardAnalyticsCard
            title="Total Accounts"
            amount={accounts.totalAccounts}
            percentage={accounts.accountsPercentageChange.toFixed(2)}
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />

          <DashboardAnalyticsCard
            title="Transactions"
            amount={transactions.totalTransactions}
            percentage={transactions.transactionsPercentageChange.toFixed(2)}
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <TransactionsDashboardCard />
          <RecentCustomersDashboardCard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

type DashboardAnalyticsCardProps = {
  title: string;
  amount: number | string;
  percentage: string;
  icon: React.ReactNode;
};

const DashboardAnalyticsCard = ({
  title,
  amount,
  percentage,
  icon,
}: DashboardAnalyticsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">
          +{percentage}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

async function getTransactionsHistoryData() {
  return await db.transactionHistory.findMany({
    take: 6,
    include: {
      fromAccount: {
        include: {
          customer: { select: { email: true, customerName: true } },
        },
      },
      toAccount: {
        include: {
          customer: { select: { email: true, customerName: true } },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

const TransactionsDashboardCard = async () => {
  const transactions = await getTransactionsHistoryData();

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your system.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/reports/transaction-history">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-5/12">From Account</TableHead>
              <TableHead className="w-5/12">To Account</TableHead>
              <TableHead className="w-2/12 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium">
                    {transaction.fromAccount.customer.customerName}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {transaction.fromAccount.customer.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {transaction.toAccount.customer.customerName}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {transaction.toAccount.customer.email}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

async function getRecentCustomersData() {
  return await db.user.findMany({
    take: 5,
    include: {
      account: {
        select: {
          balance: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}
const RecentCustomersDashboardCard = async () => {
  const customers = await getRecentCustomersData();

  return (
    <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-2">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {customers.map((customer) => (
          <div key={customer.id} className="flex gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarFallback>
                {customer.customerName
                  .split(" ")
                  .slice(0, 2)
                  .map((name) => name.charAt(0).toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {customer.customerName}
              </p>
              <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden">
                {customer.email}
              </p>
              {customer.account.map((acc) => (
                <p className="hidden md:inline-block font-medium">
                  {formatCurrency(acc.balance)}
                </p>
              ))}
            </div>
            {customer.account.map((acc) => (
              <div className="ml-auto font-medium block md:hidden">
                {formatCurrency(acc.balance)}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
