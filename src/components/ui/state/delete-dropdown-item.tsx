"use client";

import React, { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteState } from "@/app/_actions/state";

const DeleteDropdownItem = ({ id }: { id: string }) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await deleteState(id);
          router.refresh();
        })
      }>
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteDropdownItem;
