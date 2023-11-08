"use client";

export default function ErrorProductPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <div>{error.message}</div>;
}
