import type { ISidebarItem } from "@/types";

export const generateRoutes = (sideBarItems: ISidebarItem[]) => {
  return sideBarItems.flatMap((section) => section.items.map((item) => ({ path: item.url, Component: item.component })));
};
