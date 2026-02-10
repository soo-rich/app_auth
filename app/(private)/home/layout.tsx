"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return { children };
};

export default PrivateLayout;
