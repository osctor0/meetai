"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useRouter } from "next/navigation"

export const AgentsView = () => {
    const router = useRouter();
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({}))

    // SKA EGENTLIGEN INTE VARA HÄR!!!
    const agents = Array.isArray(data) ? data : data.items

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
            data={agents} 
            columns={columns} 
            onRowClick={(row) => router.push(`/agents/${row.id}`)}
            />
        </div>
    )
}

