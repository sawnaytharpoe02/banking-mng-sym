import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchedAllStateData = async () => {
  noStore();
  try {
    return await db.state.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const getStateById = async (id: string) => {
  try {
    return await db.state.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};
