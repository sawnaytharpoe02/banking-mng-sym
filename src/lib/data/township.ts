import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchedAllTownshipData = async () => {
  noStore();
  try {
    return await db.township.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const fetchTownshipPages = async (
  itemsPerPage: number,
  query: string
) => {
  const count = await db.township.count({
    where: {
      OR: [
        { townshipCode: { contains: query, mode: "insensitive" } },
        { townshipName: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { created_at: "desc" },
  });

  return Math.ceil(Number(count) / itemsPerPage);
};

export const fetchedTownshipData = async (
  query: string = "",
  currentPage: number,
  itemsPerPage: number
) => {
  noStore();
  try {
    const offset = (currentPage - 1) * itemsPerPage;

    return await db.township.findMany({
      skip: offset,
      take: itemsPerPage,
      where: {
        OR: [
          { townshipCode: { contains: query, mode: "insensitive" } },
          { townshipName: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    return null;
  }
};

export const getTownshipById = async (id: string) => {
  try {
    return await db.township.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};
