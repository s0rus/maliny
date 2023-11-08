"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = (props: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
