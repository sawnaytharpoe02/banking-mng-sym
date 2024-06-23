import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const TableRowSkeleton = ({ cols }: { cols: number }) => {
  return (
    <TableRow className="border-b last-of-type:border-none">
      {Array(cols)
        .fill(0)
        .map((i) => {
          return (
            <TableCell key={i}>
              <Skeleton className="h-5" />
            </TableCell>
          );
        })}
    </TableRow>
  );
};

export const TownshipTableSkeleton = () => {
  return (
    <div className="h-80">
      <Table>
        <TableCaption>A list of country townships.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">#</TableHead>
            <TableHead className="w-2/6">Township Code</TableHead>
            <TableHead className="w-2/6">Township Name</TableHead>
            <TableHead className="w-1/6 sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRowSkeleton cols={4} />
          <TableRowSkeleton cols={4} />
          <TableRowSkeleton cols={4} />
          <TableRowSkeleton cols={4} />
          <TableRowSkeleton cols={4} />
          <TableRowSkeleton cols={4} />
        </TableBody>
      </Table>
    </div>
  );
};

export const CustomerTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>A list of customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">#</TableHead>
          <TableHead className="w-2/12">Customer Code</TableHead>
          <TableHead className="w-3/12">Customer Name</TableHead>
          <TableHead className="w-3/12">Email</TableHead>
          <TableHead className="w-2/12">Township Code</TableHead>
          <TableHead className="w-1/12 sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRowSkeleton cols={7} />
        <TableRowSkeleton cols={7} />
        <TableRowSkeleton cols={7} />
        <TableRowSkeleton cols={7} />
        <TableRowSkeleton cols={7} />
        <TableRowSkeleton cols={7} />
      </TableBody>
    </Table>
  );
};

export const AccountTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>A list of accounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">#</TableHead>
          <TableHead className="w-3/12">Account No</TableHead>
          <TableHead className="w-3/12">Customer Name</TableHead>
          <TableHead className="w-2/12">Mobile No</TableHead>
          <TableHead className="w-2/12 text-right">Balance</TableHead>
          <TableHead className="w-1/12 sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowSkeleton cols={6} />
          <TableRowSkeleton cols={6} />
          <TableRowSkeleton cols={6} />
          <TableRowSkeleton cols={6} />
          <TableRowSkeleton cols={6} />
          <TableRowSkeleton cols={6} />
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const TransactionHistoryTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>A list of transaction history.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">#</TableHead>
          <TableHead className="w-3/12">From Account No</TableHead>
          <TableHead className="w-3/12">To Account No</TableHead>
          <TableHead className="w-3/12">Transcation Date</TableHead>
          <TableHead className="w-2/12">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowSkeleton cols={5} />
          <TableRowSkeleton cols={5} />
          <TableRowSkeleton cols={5} />
          <TableRowSkeleton cols={5} />
          <TableRowSkeleton cols={5} />
          <TableRowSkeleton cols={5} />
        </TableRow>
      </TableBody>
    </Table>
  );
};

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <Skeleton className="h-3 w-28" />
        </CardTitle>
        <Skeleton className="h-5 w-6" />
      </CardHeader>
      <CardContent className="space-y-2 mt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
};

export const AnalyticsCardSkeleton = () => {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
};

const TransactionRowSkeleton = () => {
  return (
    <TableRow className="border-b last-of-type:border-none">
      <TableCell>
        <div className="flex flex-col space-y-1">
          <Skeleton className="w-28 h-4" />
          <div className="hidden md:inline">
            <Skeleton className="w-44 h-4" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col space-y-1">
          <Skeleton className="w-28 h-4" />
          <div className="hidden md:inline">
            <Skeleton className="w-44 h-4" />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-full h-4" />
      </TableCell>
    </TableRow>
  );
};

export const TransactionsChartSkeleton = () => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>
            <Skeleton className="h-4 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-64" />
          </CardDescription>
        </div>
        <Skeleton className="h-8 w-24" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-5/12">
                <Skeleton className="h-3 w-32" />
              </TableHead>
              <TableHead className="w-5/12">
                <Skeleton className="h-3 w-32" />
              </TableHead>
              <TableHead className="w-2/12 text-right">
                <Skeleton className="h-3 w-16 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const CustomerRowSkeleton = () => {
  return (
    <div className="flex gap-4">
      <div className="hidden h-9 w-9 sm:flex">
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
      <div className="grid gap-1">
        <Skeleton className="h-3.5 w-36" />
        <Skeleton className="h-3.5 w-48" />
        <div className="hidden md:inline-block mt-2">
          <Skeleton className="h-[22px] w-32" />
        </div>
      </div>
      <div className="ml-auto block md:hidden">
        <Skeleton className="h-[22px] w-32" />
      </div>
    </div>
  );
};

export const RecentCustomersChartSkeleton = () => {
  return (
    <Card className="xl:col-span-1">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-36" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <CustomerRowSkeleton />
        <CustomerRowSkeleton />
        <CustomerRowSkeleton />
        <CustomerRowSkeleton />
        <CustomerRowSkeleton />
      </CardContent>
    </Card>
  );
};
