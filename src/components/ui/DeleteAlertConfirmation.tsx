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

type DeleteAlertConfirmationProps = {
  id: string;
  options: "state" | "township";
  children: React.ReactNode;
};
const DeleteAlertConfirmation = ({
  id,
  options,
  children,
}: DeleteAlertConfirmationProps) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      {children}
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
