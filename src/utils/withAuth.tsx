import Loader from "@/components/Loader";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import type { TUserRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";


export const WithAuth = (Component:ComponentType, userRole?:TUserRole) => {
    return (props: any) => {
        const{data,isLoading} = useUserInfoQuery({})

        if(isLoading){
            return <Loader/>
        }

        if(!isLoading && !data?.data?.role.includes(userRole)){
            return <Navigate to="/unauthorized" />
        }

        return <Component/>;
    };
};