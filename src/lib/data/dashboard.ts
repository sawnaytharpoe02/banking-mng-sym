import db from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const getRevenueData = async () => {
  noStore();

  try {
    // Get the first and last day of the current month
    const startOfCurrentMonth = new Date(new Date().setDate(1));
    const endOfCurrentMonth = new Date(
      new Date(startOfCurrentMonth).setMonth(startOfCurrentMonth.getMonth() + 1)
    );

    // Get the first and last day of the previous month
    const startOfPreviousMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    );
    startOfPreviousMonth.setDate(1);
    const endOfPreviousMonth = new Date(
      new Date(startOfPreviousMonth).setMonth(
        startOfPreviousMonth.getMonth() + 1
      )
    );

    // Calculate the total balance for the current month
    const currentMonthTotalBalance = await db.account.aggregate({
      _sum: {
        balance: true,
      },
      where: {
        created_at: {
          gte: startOfCurrentMonth,
          lt: endOfCurrentMonth,
        },
      },
    });

    // Calculate the total balance for the previous month
    const previousMonthTotalBalance = await db.account.aggregate({
      _sum: {
        balance: true,
      },
      where: {
        created_at: {
          gte: startOfPreviousMonth,
          lt: endOfPreviousMonth,
        },
      },
    });

    // Calculate the percentage change, changes from previous month
    const currentTotal = currentMonthTotalBalance._sum.balance || 0;
    const previousTotal = previousMonthTotalBalance._sum.balance || 0;
    const percentageChange = previousTotal
      ? ((currentTotal - previousTotal) / previousTotal) * 100
      : 100;

    return {
      totalRevenue: currentTotal,
      percentageChange,
    }
  } catch (error) {
    return null;
  }
};

export const getCustomersData = async () => {
  noStore();

  try {
    const currentMonthUsers = await db.user.count({
      where: {
        created_at: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    const previousMonthUsers = await db.user.count({
      where: {
        created_at: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
          lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // Calculate the percentage change, changes from previous month
    const userPercentageChange = previousMonthUsers
      ? ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100
      : 100;

    return {
      newUsers: currentMonthUsers,
      userPercentageChange,
    };
  } catch (error) {
    return null;
  }
};

export const getAccountsData = async () => {
  noStore();

  try {
    const totalAccounts = await db.account.count();

    const previousMonthAccounts = await db.account.count({
      where: {
        created_at: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
          lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // Calculate the percentage change, changes from previous month
    const accountsPercentageChange = previousMonthAccounts
      ? ((totalAccounts - previousMonthAccounts) / previousMonthAccounts) * 100
      : 100;

    return {
      totalAccounts,
      accountsPercentageChange,
    };
  } catch (error) {
    return null;
  }
};

export const getTransactionsData = async () => {
  noStore();

  try {
    const totalTransactions = await db.transactionHistory.count();

    const previousMonthTransactions = await db.transactionHistory.count({
      where: {
        created_at: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
          lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // Calculate the percentage change, changes from previous month
    const transactionsPercentageChange = previousMonthTransactions
      ? ((totalTransactions - previousMonthTransactions) /
          previousMonthTransactions) *
        100
      : 100;

    return {
      totalTransactions,
      transactionsPercentageChange,
    };
  } catch (error) {
    return null;
  }
};

export const getTransactionsHistoryData = async () => {
  noStore();
  try {
    return await db.transactionHistory.findMany({
      take: 6,
      include: {
        fromAccount: {
          include: {
            customer: { select: { email: true, customerName: true } },
          },
        },
        toAccount: {
          include: {
            customer: { select: { email: true, customerName: true } },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    return null;
  }
};

export const getRecentCustomersData = async () => {
  noStore();
  try {
    return await db.user.findMany({
      take: 5,
      include: {
        account: {
          select: {
            balance: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    return null;
  }
};
