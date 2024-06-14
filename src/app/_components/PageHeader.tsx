import React, { PropsWithChildren } from "react";

const PageHeader = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <p className="text-4xl font-medium mb-6">{children}</p>
    </div>
  );
};

export default PageHeader;
