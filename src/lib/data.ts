import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchedStateData = async () => {
  try {
    return await db.state.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const fetchedTownshipData = async () => {
  try {
    return await db.township.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const fetchedCustomerData = async () => {
  try {
    return await db.user.findMany({ orderBy: { created_at: "desc" } });
  } catch (error) {
    return null;
  }
};

export const fetchedAccountData = async () => {
  noStore();
  try {
    return await db.account.findMany({
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
