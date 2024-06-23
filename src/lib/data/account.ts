import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchAccountPages = async (
  itemsPerPage: number,
  query: string = ""
) => {
  const queryAsNumber = parseInt(query, 10);
  const count = await db.account.count({
    where: {
      OR: [
        {
          accountNumber: { contains: query, mode: "insensitive" },
        },
        ...(isNaN(queryAsNumber) ? [] : [{ balance: queryAsNumber }]),
        {
          customer: {
            OR: [
              { customerName: { contains: query, mode: "insensitive" } },
              { phone: { contains: query, mode: "insensitive" } },
            ],
          },
        },
      ],
    },
    orderBy: { created_at: "desc" },
  });

  return Math.ceil(Number(count) / itemsPerPage);
};

export const fetchedAccountData = async (
  query: string,
  currentPage: number,
  itemsPerPage: number
) => {
  noStore();
  try {
    const queryAsNumber = parseInt(query, 10);
    return await db.account.findMany({
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      where: {
        OR: [
          {
            accountNumber: { contains: query, mode: "insensitive" },
          },
          ...(isNaN(queryAsNumber) ? [] : [{ balance: queryAsNumber }]),
          {
            customer: {
              OR: [
                { customerName: { contains: query, mode: "insensitive" } },
                { phone: { contains: query, mode: "insensitive" } },
              ],
            },
          },
        ],
      },
      include: { customer: true },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    return null;
  }
};

export const getAccountById = async (id: string) => {
  try {
    return await db.account.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};

export const getAccount = async (accountNumber: string) => {
  try {
    return await db.account.findUnique({ where: { accountNumber } });
  } catch (error) {
    return null;
  }
};
