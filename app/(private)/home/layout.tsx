"use client";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default PrivateLayout;
