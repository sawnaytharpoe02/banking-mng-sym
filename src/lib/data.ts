import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchedStateData = async () => {
  noStore();
  try {
    return await db.state.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const fetchedTownshipData = async (query: string = "") => {
  noStore();
  try {
    return await db.township.findMany({
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

export const fetchedCustomerData = async (query: string = "") => {
  noStore();
  try {
    return await db.user.findMany({
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

export const fetchedAccountData = async (query: string) => {
  noStore();
  try {
    const queryAsNumber = parseInt(query, 10);
    return await db.account.findMany({
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

export const fetchedTranscationHistoryData = async (
  from: string,
  to: string
) => {
  try {
    return await db.transactionHistory.findMany({
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
