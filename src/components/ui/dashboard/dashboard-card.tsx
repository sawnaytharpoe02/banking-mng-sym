import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

const iconMap = {
  revenue: DollarSign,
  customer: Users,
  account: CreditCard,
  transaction: Activity,
};

type DashboardAnalyticsCardProps = {
  title: string;
  amount: number | string;
  percentage: string;
  type: "revenue" | "customer" | "account" | "transaction";
};

const DashboardAnalyticsCard = ({
  title,
  amount,
  percentage,
  type,
}: DashboardAnalyticsCardProps) => {
  const Icon = iconMap[type];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">
          +{percentage}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardAnalyticsCard;
