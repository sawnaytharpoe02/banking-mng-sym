import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { fetchedTranscationHistoryData } from "@/lib/data/report";

type TransactionHistoryTableProps = {
  fromDate: string;
  toDate: string;
  currentPage: number;
  itemsPerPage: number;
};

const TransactionHistoryTable = async ({
  fromDate,
  toDate,
  currentPage,
  itemsPerPage,
}: TransactionHistoryTableProps) => {
  const data = await fetchedTranscationHistoryData(
    fromDate,
    toDate,
    currentPage,
    itemsPerPage
  );

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
        {data?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.fromAccountNumber}</TableCell>
            <TableCell>{item.toAccountNumber}</TableCell>
            <TableCell>{dayjs(item.created_at).format("YYYY-MM-DD")}</TableCell>
            <TableCell>{formatCurrency(item.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionHistoryTable;
