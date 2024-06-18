import db from "@/db";

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

export const fetchedTranscationHistoryData = async () => {
  try {
    return await db.transactionHistory.findMany({
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    return null;
  }
};
