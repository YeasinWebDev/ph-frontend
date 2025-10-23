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
      query: (params) => ({
        url: `/division?page=${params.page}&limit=${params.limit}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Divisions"],
    }),

    updateDivision: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/division/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["Divisions"],
    }),

    deleteDivision: builder.mutation<null, string>({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Divisions"],
    }),

  }),
});

export const {  useAddDivisionMutation, useGetDivisionsQuery, useUpdateDivisionMutation, useDeleteDivisionMutation } = divisionApi;
