import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionInfo) => ({
        url: "/division/create",
        method: "POST",
        data: divisionInfo,
      }),
      invalidatesTags: ["Divisions"],
    }),
    getDivisions: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Divisions"],
    }),

  }),
});

export const {  useAddDivisionMutation, useGetDivisionsQuery } = divisionApi;
