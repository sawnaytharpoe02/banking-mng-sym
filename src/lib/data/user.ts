import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchedAllCustomerData = async () => {
  noStore();
  try {
    return await db.user.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const fetchCustomerPages = async (
  itemsPerPage: number,
  query: string = ""
) => {
  const count = await db.user.count({
    where: {
      OR: [
        { customerCode: { contains: query, mode: "insensitive" } },
        { customerName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { townshipCode: { contains: query, mode: "insensitive" } },
        { stateCode: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { created_at: "desc" },
  });

  return Math.ceil(Number(count) / itemsPerPage);
};

export const fetchedCustomerData = async (
  query: string = "",
  currentPage: number,
  itemsPerPage: number
) => {
  noStore();
  try {
    const offset = (currentPage - 1) * itemsPerPage;

    return await db.user.findMany({
      skip: offset,
      take: itemsPerPage,
      where: {
        OR: [
          { customerCode: { contains: query, mode: "insensitive" } },
          { customerName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { townshipCode: { contains: query, mode: "insensitive" } },
          { stateCode: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    return null;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};
