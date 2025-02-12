'use client';

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider refetchInterval={4 * 60}>
      {children}
    </SessionProvider>
  );
}