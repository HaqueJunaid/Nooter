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
                                    {breadcrums.map((breadcrumb) => (
                                        <BreadcrumbItem key={breadcrumb.label}>
                                            <BreadcrumbLink asChild>
                                                <Link href={breadcrumb.href}>
                                                    {breadcrumb.label}
                                                </Link>
                                            </BreadcrumbLink>
                                            <BreadcrumbSeparator />
                                        </BreadcrumbItem>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div>
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