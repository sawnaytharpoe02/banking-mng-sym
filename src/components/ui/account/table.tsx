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
import { formatCurrency } from "@/lib/utils";
import { fetchedAccountData } from "@/lib/data";
import DeleteDropdownItem from "../DeleteDropdownItem";

type AccountTableProps = {
  query: string;
  currentPage: number;
  itemsPerPage: number;
};

const AccountTable = async ({
  query,
  currentPage,
  itemsPerPage,
}: AccountTableProps) => {
  const data = await fetchedAccountData(query, currentPage, itemsPerPage);

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
            <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
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
                  <DeleteDropdownItem id={item.id} options="account" />
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
