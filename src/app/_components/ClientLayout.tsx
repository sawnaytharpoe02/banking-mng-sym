"use client";

import React from "react";
import { AppWrapper } from "@/context";
import DeleteAlertConfirmation from "@/components/ui/DeleteAlertConfirmation";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppWrapper>
      <DeleteAlertConfirmation />
      {children}
    </AppWrapper>
  );
};

export default ClientLayout;
