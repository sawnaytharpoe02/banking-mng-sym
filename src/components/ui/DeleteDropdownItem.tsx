"use client";

import React, { useState } from "react";
import { DropdownMenuItem } from "./dropdown-menu";
import { useDeleteAlert } from "@/app/context";

type DeleteDropdownItemProps = {
  id: string;
  options: "state" | "township" | "customer" | "account";
};

const DeleteDropdownItem = ({ id, options }: DeleteDropdownItemProps) => {
  const { open } = useDeleteAlert();
  return (
    <>
      <DropdownMenuItem variant="destructive" onClick={() => open(id, options)}>
        Delete
      </DropdownMenuItem>
    </>
  );
};

export default DeleteDropdownItem;
