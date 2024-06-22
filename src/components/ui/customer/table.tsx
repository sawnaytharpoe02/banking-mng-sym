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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { fetchedCustomerData } from "@/lib/data";
import DeleteDropdownItem from "../DeleteDropdownItem";

type CustomerTableProps = {
  query: string;
  currentPage: number;
  itemsPerPage: number;
};

const CustomerTable = async ({
  query,
  currentPage,
  itemsPerPage,
}: CustomerTableProps) => {
  const data = await fetchedCustomerData(query, currentPage, itemsPerPage);

  return (
    <Table>
      <TableCaption>A list of customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Customer Code</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Township Code</TableHead>
          <TableHead>State Code</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
            <TableCell>{item.customerCode}</TableCell>
            <TableCell>{item.customerName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.townshipCode !== 'invalid' ? item.townshipCode : 'N/A'}</TableCell>
            <TableCell>{item.stateCode}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/customers/view/${item.id}`}>View</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/customers/edit/${item.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={item.id} options="customer" />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
