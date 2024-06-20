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
import DeleteAlertConfirmation from "../DeleteAlertConfirmation";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { fetchedCustomerData } from "@/lib/data";

type CustomerTableProps = {
  query: string;
};

const CustomerTable = async ({ query }: CustomerTableProps) => {
  const data = await fetchedCustomerData(query);

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
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.customerCode}</TableCell>
            <TableCell>{item.customerName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.townshipCode}</TableCell>
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
                  <DeleteAlertConfirmation id={item.id} options="customer">
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

export default CustomerTable;
