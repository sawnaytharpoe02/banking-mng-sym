"use client";

import React from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dayjs from "dayjs";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type TranscationHistoryFormProps = {
  fromDate: string;
  toDate: string;
};
const TranscationHistoryForm = ({
  fromDate,
  toDate,
}: TranscationHistoryFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const fromDateFormatted = dayjs(fromDate).format("YYYY, MM, DD");
  const toDateFormatted = dayjs(toDate).format("YYYY, MM, DD");

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromDate !== "" ? new Date(fromDateFormatted) : new Date(2024, 0, 20),
    to:
      toDate !== ""
        ? addDays(new Date(toDateFormatted), 0)
        : addDays(new Date(2024, 0, 20), 20),
  });

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    if (date?.from) {
      params.set("from", dayjs(date.from).format("YYYY-MM-DD"));
    } else {
      params.delete("query");
    }

    if (date?.to) {
      params.set("to", dayjs(date.to).format("YYYY-MM-DD"));
    } else {
      params.delete("to");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <DatePickerWithRange date={date} setDate={setDate} />
        <Button onClick={handleSearch}>
          <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default TranscationHistoryForm;
