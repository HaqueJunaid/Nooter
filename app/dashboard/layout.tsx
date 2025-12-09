import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { getNotebooks } from '@/server/notebooks'

const DashbaordLayout = async ({ children }: { children: React.ReactNode }) => {
  const response = await getNotebooks()
  const notebooks = response.success ? response.allNotebooks ?? [] : []

  return (
    <SidebarProvider>
      <AppSidebar notebooks={notebooks} />
      <main className="flex-1">
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashbaordLayout