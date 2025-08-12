
import type { TUserRole } from "@/types";
import userSidebar from '@/routes/userSidebarItems';
import AdminSidebar from "@/routes/adminSidebarItems";
import { UserRole } from "@/constants/role";


export const getSidebarItems = (userRole: TUserRole) => {
  switch (userRole) {
    case UserRole.superAdmin:
      return [...AdminSidebar];
    case UserRole.admin:
      return [...AdminSidebar];
    case UserRole.user:
      return [...userSidebar];
    default:
      return [];
  }
};