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
import DeleteDropdownItem from "../DeleteDropdownItem";
import { fetchedAccountData } from "@/lib/data/account";

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
          <TableHead className="w-1/12">#</TableHead>
          <TableHead className="w-3/12">Account No</TableHead>
          <TableHead className="w-3/12">Customer Name</TableHead>
          <TableHead className="w-2/12">Mobile No</TableHead>
          <TableHead className="w-2/12 text-right">Balance</TableHead>
          <TableHead className="w-1/12 sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
            <TableCell>{item.accountNumber}</TableCell>
            <TableCell>{item.customer.customerName}</TableCell>
            <TableCell>{item.customer.phone}</TableCell>
            <TableCell className="text-right">{formatCurrency(item.balance)}</TableCell>
            <TableCell className="text-center">
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
