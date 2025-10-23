import { AppSidebar } from "@/components/app-sidebar"
 import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
