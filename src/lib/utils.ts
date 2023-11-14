import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function priceFormatter() {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "USD",
  });
}

export function capitalizeWord(word: string) {
  if (word.length === 0) {
    return word;
  }

  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

interface ShippingInfo {
  arrival: string;
  payWithin: string | null;
}

export function calculateShippingInfo(): ShippingInfo {
  const orderDate = dayjs();
  const parsedOrderDate = dayjs(orderDate, { format: "YYYY-MM-DD HH:mm:ss" });

  const cutoffTime = dayjs().set("hour", 16).set("minute", 0).set("second", 0);

  const timeLeft = cutoffTime.diff(parsedOrderDate, "minutes");
  const hours = Math.floor(timeLeft / 60);
  const minutes = timeLeft % 60;

  let shippingDate = dayjs(parsedOrderDate).isBefore(cutoffTime)
    ? dayjs(parsedOrderDate).add(1, "day")
    : dayjs(parsedOrderDate).add(2, "day");

  if (shippingDate.day() === 0) {
    shippingDate = shippingDate.add(1, "day");
  } else if (shippingDate.day() === 6) {
    shippingDate = shippingDate.add(2, "day");
  }

  const isLongerThan2Days = shippingDate.diff(parsedOrderDate, "days") > 2;

  return {
    arrival: isLongerThan2Days
      ? shippingDate.format("DD/MM/YYYY")
      : shippingDate.isSame(parsedOrderDate, "day")
      ? "tomorrow"
      : "day after tomorrow",
    payWithin: timeLeft > 0 ? `${hours} hours ${minutes} minutes` : null,
  };
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
