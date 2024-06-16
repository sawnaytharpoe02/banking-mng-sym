import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Township } from "@prisma/client";
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

type TownshipTableProps = {
  data: Township[];
};

const TownshipTable = ({ data }: TownshipTableProps) => {
  return (
    <Table>
      <TableCaption>A list of country townships.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Township Code</TableHead>
          <TableHead>Township Name</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.townshipCode}</TableCell>
            <TableCell>{item.townshipName}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/townships/edit/${item.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DeleteAlertConfirmation id={item.id}>
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

export default TownshipTable;
