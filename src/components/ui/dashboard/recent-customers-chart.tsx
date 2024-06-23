import db from "@/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

async function getRecentCustomersData() {
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
}

const RecentCustomersChart = async () => {
  const customers = await getRecentCustomersData();

  return (
    <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-2">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {customers.map((customer) => (
          <div key={customer.id} className="flex gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarFallback>
                {customer.customerName
                  .split(" ")
                  .slice(0, 2)
                  .map((name) => name.charAt(0).toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {customer.customerName}
              </p>
              <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden">
                {customer.email}
              </p>
              {customer.account.map((acc) => (
                <p className="hidden md:inline-block font-medium">
                  {formatCurrency(acc.balance)}
                </p>
              ))}
            </div>
            {customer.account.map((acc) => (
              <div className="ml-auto font-medium block md:hidden">
                {formatCurrency(acc.balance)}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentCustomersChart;