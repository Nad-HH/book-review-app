"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    user: session?.user,
  };
}
