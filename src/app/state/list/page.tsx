import db from "@/db";
import React from "react";

async function fetchedStateData() {
  return await db.state.findMany({ orderBy: { created_at: "desc" } });
}

const StateListPage = async () => {
  const stateData = await fetchedStateData();

  return <div>{JSON.stringify(stateData)}</div>;
};

export default StateListPage;
