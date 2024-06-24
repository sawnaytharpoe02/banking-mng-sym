"use client";

import React from "react";
import { AppWrapper } from "../../context";
import DeleteAlertConfirmation from "@/components/ui/DeleteAlertConfirmation";
import { Toaster } from "@/components/ui/toaster";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppWrapper>
      <DeleteAlertConfirmation />
      {children}
      <Toaster />
    </AppWrapper>
  );
};

export default ClientLayout;
