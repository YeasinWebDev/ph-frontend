import * as React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import Logo from "@/assets/images/logo.png";
import { useLocation } from "react-router";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useUserInfoQuery({});
  const location = useLocation();
  const data = {
    navMain: getSidebarItems(user?.data?.role),
  };
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Link to="/" className="flex items-center border-b-1 border-b-gray-300">
          <img src={Logo} alt="Logo" className="h-14 w-14" />
          <h2 className="font-semibold text-lg">TripTrack</h2>
        </Link>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  let url = location.pathname.split("/")[2];
                  if (url === "add-tour" || url === "add-division" || url === "add-tour-type") {
                    url = url.split("-").join(" ");
                  }
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className={`block w-full rounded-md font-semibold transition-colors
                           ${url === item.title.toLocaleLowerCase() ? "bg-orange-500 text-white" : "bg-transparent hover:bg-orange-100"}`}
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
