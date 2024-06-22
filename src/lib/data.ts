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

export const getTownshipById = async (id: string) => {
  try {
    return await db.township.findUnique({ where: { id } });
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

export const getCustomerById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
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

export const fetchTransactionHistoryPages = async (
  from: string,
  to: string,
  itemsPerPage: number
) => {
  const count = await db.transactionHistory.count({
    where: {
      created_at: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
    },
    orderBy: { created_at: "desc" },
  });

  return Math.ceil(Number(count) / itemsPerPage);
};

export const fetchedTranscationHistoryData = async (
  from: string,
  to: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const offset = (currentPage - 1) * itemsPerPage;
  try {
    return await db.transactionHistory.findMany({
      skip: offset,
      take: itemsPerPage,
      where: {
        created_at: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    return null;
  }
};
