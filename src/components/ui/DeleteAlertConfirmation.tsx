"use client";

import React, { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteState } from "@/app/_actions/state";
import { useRouter } from "next/navigation";
import { deleteTownship } from "@/app/_actions/township";
import { deleteUser } from "@/app/_actions/customer";
import { deleteAccount } from "@/app/_actions/account";
import { useDeleteAlert } from "@/context";

const DeleteAlertConfirmation = () => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, close, id, options } = useDeleteAlert();

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your item
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                if (options === "state") {
                  await deleteState(id);
                } else if (options === "township") {
                  await deleteTownship(id);
                } else if (options === "customer") {
                  await deleteUser(id);
                } else if (options === "account") {
                  await deleteAccount(id);
                }
                router.refresh();
              });
            }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertConfirmation;
