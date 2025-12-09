import React from "react"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "./ui/sidebar"
import LogoutButton from "./LogoutButton"
import { ModeToggle } from "./ui/themeToggleButton"


interface PageWrapperProps {
    children: React.ReactNode,
    breadcrums: {
        label: string,
        href: string
    }[]
}

export function PageWrapper({ children, breadcrums }: PageWrapperProps) {
    {
        return (
            <div className="flex flex-col gap-4">
                <header className="flex items-center border-b">
                    <div className="flex w-full justify-between p-4">
                        <div className="flex gap-4 items-center">
                            <SidebarTrigger />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrums.map((breadcrumb, idx) => (
                                        <React.Fragment key={breadcrumb.label}>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink asChild>
                                                    <Link href={breadcrumb.href}>
                                                        {breadcrumb.label}
                                                    </Link>
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {idx < breadcrums.length - 1 && <BreadcrumbSeparator />}
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex items-center gap-4">
                            <ModeToggle />
                            <LogoutButton />
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </div>
        )
    }
}