
import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsInsertSchema } from "../../schemas"; 

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";

interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;

}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [agentSearch, setAgentSearch] = useState("");

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        }),
    )

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )

            if (initialValues?.id) {
                await queryClient.invalidateQueries(
                trpc.meetings.getOne.queryOptions({ id: initialValues.id })
                )
            }
            onSuccess?.(data.id); 

        },
            onError: (error) => {
                toast.error(error.message);

                //TDO check if error code is forbinner, redirect
            }
        })
    )

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "", 
            agentId: initialValues?.agentId ?? "",
        },
    })

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            console.log("TODO: update meeting")

        } else {
            createMeeting.mutate(values);
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>            
                <FormField
                name="name"
                control={form.control}
                render={({ field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="e.g Math Consultations"/>
                        </FormControl>  
                        <FormMessage />                      
                    </FormItem>
                )}
                />

                
            
                <FormField
                name="agentId"
                control={form.control}
                render={({ field}) => (
                    <FormItem>
                        <FormLabel>Agent</FormLabel>
                        <FormControl>
                            <CommandSelect
                            options={(agents.data?.items ?? []).map((agent) => ({
                                id: agent.id,
                                value: agent.id,
                                children: (
                                    <div className="flex items-center gap-x-2">
                                        <GeneratedAvatar
                                            seed={agent.name}
                                            variant="botttsNeutral"
                                            className="border size-6"
                                        />
                                        <span>{agent.name}</span>
                                    </div>
                                )
                            }))}
                            onSelect={field.onChange}
                            onSearch={setAgentSearch}
                            value={field.value}
                            placeholder="Select an agent"
                            />
                        </FormControl>  
                        <FormMessage />                      
                    </FormItem>
                )}
                />
                                
                <div className="flex justify-between gap-x-2">
                    {onCancel && (
                        <Button
                            variant="ghost"
                            disabled={isPending}
                            type="button"
                            onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {isEdit ? "Update" : "Create"}
                    </Button>

                </div>
            </form>
        </Form>
    )
}
