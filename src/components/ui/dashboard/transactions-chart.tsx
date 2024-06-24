import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { getTransactionsHistoryData } from "@/lib/data/dashboard";

const TransactionsChart = async () => {
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
            {transactions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <p className="my-3 text-sm text-muted-foreground mx-auto w-fit">
                    There is no transactions.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              transactions?.map((transaction) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsChart;
