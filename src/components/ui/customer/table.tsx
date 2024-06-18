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
import { User } from "@prisma/client";

type CustomerTableProps = {
  data: User[] | null;
};

const CustomerTable = ({ data }: CustomerTableProps) => {
  return (
    <Table>
      <TableCaption>A list of customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Customer Code</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>NRC</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
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
            <TableCell>{item.nrc ? item.nrc : 'N/A'}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.townshipCode}</TableCell>
            <TableCell>{item.stateCode}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/customers/edit/${item.id}`}>Edit</Link>
                  </DropdownMenuItem>
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
