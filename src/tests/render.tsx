/**
 * Test utility to render components that rely on React Query.
 * Provides an isolated QueryClient per test to avoid cache leakage
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

type Options = {
  children: ReactNode;
};

export function renderWithQueryClient({ children }: Options) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
