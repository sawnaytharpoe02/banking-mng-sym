"use client";

import React from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import TranscationHistoryTable from "./table";

const TranscationHistoryForm = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  console.log(date);

  return (
    <div>
      <div className="flex items-center justify-between">
        <DatePickerWithRange date={date} setDate={setDate} />
        <Button>Search</Button>
      </div>
      <div className="mt-10">
        <TranscationHistoryTable />
      </div>
    </div>
  );
};

export default TranscationHistoryForm;
