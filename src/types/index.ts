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

export type ApiError = {
  status: number;
  success: boolean;
  message: string;
  errorSources: any[]; 
  stack?: string;
};



export type TUserRole = "USER" | "ADMIN" | "SUPER_ADMIN";