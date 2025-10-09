import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IVerifyOtp, SendOtp } from "@/types/auth.types";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    LogOut:builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, SendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),

    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo:builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        data: email,
      }),
    }),

    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        data: userInfo,
      }),
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useSendOtpMutation, useVerifyOtpMutation, useUserInfoQuery, useLogOutMutation , useForgetPasswordMutation, useChangePasswordMutation} = authApi;