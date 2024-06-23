import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

async function getCustomersData() {
  const totalUsers = await db.user.count();

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
    totalUsers,
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
  const [customers, accounts, transactions] = await Promise.all([
    getCustomersData(),
    getAccountsData(),
    getTransactionsData(),
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DashboardAnalyticsCard
            title="Total Customers"
            amount={customers.totalUsers}
            percentage={customers.userPercentageChange.toFixed(2)}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />

          <DashboardAnalyticsCard
            title="New Customers"
            amount={customers.newUsers}
            percentage={customers.userPercentageChange.toFixed(2)}
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
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
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
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
  amount: number;
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

const TransactionsDashboardCard = () => {
  return (
    <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden xl:table-column">Type</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Sale</TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const RecentCustomersDashboardCard = () => {
  return (
    <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-2">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">+$1,999.00</div>
        </div>
      </CardContent>
    </Card>
  );
};
