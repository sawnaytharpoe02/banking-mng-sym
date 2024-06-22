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
import { fetchedTownshipData } from "@/lib/data";
import DeleteDropdownItem from "../DeleteDropdownItem";

type TownshipTableProps = {
  query: string;
  currentPage: number;
  itemsPerPage: number;
};

const TownshipTable = async ({
  query,
  currentPage,
  itemsPerPage,
}: TownshipTableProps) => {
  const data = await fetchedTownshipData(query, currentPage, itemsPerPage);

  return (
    <Table>
      <TableCaption>A list of country townships.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Township Code</TableHead>
          <TableHead>Township Name</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
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
                  <DeleteDropdownItem id={item.id} options="township" />
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
