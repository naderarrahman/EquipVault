import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; 

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});

export const getToken = async () => {
  const session = await getSession();
  if (!session || !session?.session.token) {
    redirect("/unauthorized");
  }
  return session?.session.token;
};

export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  return res;
};