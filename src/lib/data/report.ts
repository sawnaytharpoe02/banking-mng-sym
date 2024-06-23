import db from "@/db";

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
