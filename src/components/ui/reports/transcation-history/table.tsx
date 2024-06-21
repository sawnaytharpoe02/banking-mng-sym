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
import { TransactionHistory } from "@prisma/client";
import dayjs from "dayjs";

type TranscationHistoryTableProps = {
  data: TransactionHistory[] | null;
};

const TranscationHistoryTable = ({ data }: TranscationHistoryTableProps) => {
  return (
    <Table>
      <TableCaption>A list of transaction history.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>From Account No</TableHead>
          <TableHead>To Account No</TableHead>
          <TableHead>Transcation Date</TableHead>
          <TableHead>Amount</TableHead>
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

export default TranscationHistoryTable;
