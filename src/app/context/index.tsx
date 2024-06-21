"use client";

import { createContext, useContext, useState } from "react";

type Options = "state" | "township" | "customer" | "account";

type DeleteAlertContextType = {
  isOpen: boolean;
  id: string;
  options: Options | null;
  open: (id: string, options: Options) => void;
  close: () => void;
};

const DeleteAlertContext = createContext<DeleteAlertContextType | undefined>(
  undefined
);

export const AppWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [options, setOptions] = useState<Options | null>(null);

  const open = (id: string, option: Options) => {
    setIsOpen(true);
    setId(id);
    setOptions(option);
  };

  const close = () => {
    setIsOpen(false);
    setId("");
    setOptions(null);
  };

  return (
    <DeleteAlertContext.Provider value={{ isOpen, id, options, open, close }}>
      {children}
    </DeleteAlertContext.Provider>
  );
};

export const useDeleteAlert = () => {
  const context = useContext(DeleteAlertContext);
  if (!context) {
    throw new Error("useDeleteAlert must be used within a DeleteAlertProvider");
  }
  return context;
};
