import StateTable from "@/components/ui/state/table";
import db from "@/db";
import React from "react";

export const dynamic = "force-dynamic";

async function fetchedStateData() {
  return await db.state.findMany({ orderBy: { created_at: "desc" } });
}

const StateListPage = async () => {
  const stateData = await fetchedStateData();

  return (
    <div>
      <StateTable data={stateData} />
    </div>
  );
};

export default StateListPage;
