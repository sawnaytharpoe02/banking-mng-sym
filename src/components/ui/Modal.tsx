"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import AlertConfirmation from "./AlertConfirmation";

type ModalProps = {
  children?: React.ReactNode;
  dialogTitle: string;
  dialogDescription: string;
};

const Modal = ({ children, dialogTitle, dialogDescription }: ModalProps) => {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleOpenChanage = () => {
    const isFormModified = localStorage.getItem("isFormModified");
    if (isFormModified && JSON.parse(isFormModified)) {
      setShowExitConfirmation(true);
    } else {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChanage}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div>
          <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            closeModal={closeModal}
            description="You haven't saved your changes. Please confirm you want to exit without saving."
          />
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
