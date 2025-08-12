import { UserRole } from './../constants/role';
import type { ComponentType } from "react";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}


export interface ISidebarItem{
  title:string;
  items:{
    title:string;
    url:string
    component:ComponentType
  }[]
}


export type TUserRole = "USER" | "ADMIN" | "SUPER_ADMIN";