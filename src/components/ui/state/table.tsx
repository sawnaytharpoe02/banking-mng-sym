import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { State } from "@prisma/client";
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

type StateTableProps = {
  data: State[];
};

const StateTable = ({ data }: StateTableProps) => {
  return (
    <Table>
      <TableCaption>A list of country states.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>State Code</TableHead>
          <TableHead>State Name</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.stateCode}</TableCell>
            <TableCell>{item.stateName}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/states/edit/${item.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DeleteAlertConfirmation id={item.id} options="state">
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

export default StateTable;
