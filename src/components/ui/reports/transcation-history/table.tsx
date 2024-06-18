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

type TranscationHistoryTableProps = {};

const TranscationHistoryTable = ({}: TranscationHistoryTableProps) => {
  return (
    <Table>
      <TableCaption>A list of accounts.</TableCaption>
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
        {/* {data?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.accountNumber}</TableCell>
            <TableCell>{item.customer.customerName}</TableCell>
            <TableCell>{item.customer.phone}</TableCell>
            <TableCell>{formatCurrency(item.balance)}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default TranscationHistoryTable;
