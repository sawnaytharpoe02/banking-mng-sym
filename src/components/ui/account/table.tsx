import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import DeleteAlertConfirmation from "../DeleteAlertConfirmation";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/lib/utils";
import { fetchedAccountData } from "@/lib/data";

type AccountTableProps = {
  query: string;
};

const AccountTable = async ({ query }: AccountTableProps) => {
  const data = await fetchedAccountData(query);

  return (
    <Table>
      <TableCaption>A list of accounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Account No</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Mobile No</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.accountNumber}</TableCell>
            <TableCell>{item.customer.customerName}</TableCell>
            <TableCell>{item.customer.phone}</TableCell>
            <TableCell>{formatCurrency(item.balance)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/accounts/edit/${item.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DeleteAlertConfirmation id={item.id} options="account">
                    <AlertDialogTrigger asChild>
                      <button className="w-full flex justify-start items-center text-sm px-2 py-1.5 rounded-sm text-white hover:bg-destructive transition-colors focus:bg-destructive">
                        Delete
                      </button>
                    </AlertDialogTrigger>
                  </DeleteAlertConfirmation>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountTable;
