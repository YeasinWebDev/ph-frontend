import { baseApi } from "@/redux/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: formData,
      }),
    }),

    verifyUser: builder.mutation<null, { otp: string; email: string }>({
      query: ({ otp, email }) => ({
        url: "/otp/verify",
        method: "POST",
        data: { otp, email },
      }),
    }),

    sendCode: builder.mutation<null, { name: string; email: string }>({
      query: ({ name, email }) => ({
        url: "/otp/send",
        method: "POST",
        data: { name, email },
      }),
    }),

    analytics: builder.query({
      query: () => ({
        url: "/user/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useVerifyUserMutation, useSendCodeMutation , useAnalyticsQuery } = profileApi;
