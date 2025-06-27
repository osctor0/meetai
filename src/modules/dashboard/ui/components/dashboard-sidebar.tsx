"use client"

import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Image from "next/image";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/Meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    }
]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    //const pathname = "/Meetings"


    return (
        <Sidebar>
            <SidebarHeader className="text-tidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" alt="Meet.AI" height={36} width={36} />
                    <p className="text-2xl font-semibold">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"/>          
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild
                                        isActive={pathname === item.href}
                                        className={cn(
                                        "hover:bg-gradient-to-r hover:from-sidebar-accent hover:from-5% hover:via-sidebar/20 hover:via-70% hover:to-sidebar/10",
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#5D6P68]/10"
    
                                        )}>
                                        <Link href={item.href}>
                                        <item.icon className="size-5 "/>                                    
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]"/>          
                </div>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild
                                        isActive={pathname === item.href}
                                        className={cn(
                                        "hover:bg-gradient-to-r hover:from-sidebar-accent hover:from-5% hover:via-sidebar/20 hover:via-70% hover:to-sidebar/10",
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#5D6P68]/10"
    
                                        )}>
                                        <Link href={item.href}>
                                        <item.icon className="size-5 "/>                                    
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton/>

            </SidebarFooter>
        </Sidebar>
    )
}