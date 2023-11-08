import { clsx, type ClassValue } from "clsx";
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

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
