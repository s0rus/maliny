"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function ErrorCategoryPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Alert variant="destructive">
      <Icon.alert className="h-4 w-4" />
      <AlertTitle>Whoops!</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <div className="mt-4">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </Alert>
  );
}
