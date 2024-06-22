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
