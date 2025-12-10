import * as React from "react"
import { ChevronRight, Notebook } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getNotebooks } from "@/server/notebooks"
import Link from "next/link"
import CreateNotebookButton from "./create-notebook"


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const response = await getNotebooks();
  console.log("Response: ", response);

  const rows = (response as any)?.data ?? []

  const notebooksMap = new Map<
    string,
    { title: string; url: string; items: { title: string; url: string }[] }
  >()

  rows.forEach((row: any) => {
    const notebook = row.notebooks
    const note = row.notes
    if (!notebook) return

    if (!notebooksMap.has(notebook.id)) {
      notebooksMap.set(notebook.id, {
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: [],
      })
    }

    if (note) {
      notebooksMap.get(notebook.id)!.items.push({
        title: note.title,
        url: `/dashboard/note/${note.id}`,
      })
    }
  })

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: Array.from(notebooksMap.values()),
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col pl-[9.5px] pr-[9.5px] mt-2 mb-2.5 gap-5">
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Notebook className="size-4" />
            </div>
            <span className='text-xl font-bold leading-none'>Nooter</span>
          </Link>
          <CreateNotebookButton />
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup className="-mb-1">
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-md"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  {item.items.length > 0 && <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
