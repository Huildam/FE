"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient());

  const isDev = process.env.NODE_ENV === "development";

  return (
    <QueryClientProvider client={client}>
      {children}
      {isDev && <div style={{ fontSize: "16px" }} />}
    </QueryClientProvider>
  );
}
