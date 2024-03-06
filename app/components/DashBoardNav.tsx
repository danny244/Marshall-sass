"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "./UserNav"


export function DashboardNav() {
    const pathName = usePathname()
    return (
        <nav className="grid items-start gap-2">
            {
                navItems.map(
                    (item, index) => (
                        <Link href={item.href} key={index}>
                            <span className={cn("group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-700", pathName === item.href && "bg-accent" )}>
                                <item.icon className="mr-2 h-4 w-4 text-primary" />
                                <span>{item.name}</span>
                            </span>
                        </Link>
                    )
                )
            }
        </nav>
    )
}