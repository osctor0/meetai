"use client"

import { DataTable } from "@/components/data-table";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { useRouter } from "next/navigation";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  const router = useRouter();

  return (
    <div className="overflow-x-scroll">
      <DataTable 
      data={data.items} 
      columns={columns} 
      onRowClick={(row) => router.push(`/Meetings/${row.id}`)} /> 
    </div>
  );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
        title="Loading meetings"
        description="This may take a few seconnds"
        />
    )
}