import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "MMK",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  if (isNaN(amount)) {
    return "";
  }
  return CURRENCY_FORMATTER.format(amount);
}
