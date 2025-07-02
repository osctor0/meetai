"use client"

import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Divide } from "lucide-react"
import { LoadingState } from "@/components/loading-state"

export const AgentsView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

