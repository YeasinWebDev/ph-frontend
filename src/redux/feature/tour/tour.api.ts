import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITourPackage, ITourResponse } from "@/types/tour.types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["Tours"],
    }),
    updateTour: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/tour/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["Tours"],
    }),
    deleteTour: builder.mutation<null, string>({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tours"],
    }),
    createTourType: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["TourTypes"],
    }),
    updateTourType: builder.mutation({
      query: ({ id, name }) => ({
        url: `/tour/tour-types/${id}`,
        method: "PATCH",
        data: {name},
      }),
      invalidatesTags: ["TourTypes"],
    }),
    getAllToursType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["TourTypes"],
    }),

    removeTourType: builder.mutation<null, string>({
      query: (tourId) => ({
        url: `/tour/tour-types/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TourTypes"],
    }),

    getAllTours: builder.query<ITourResponse, unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["Tours"],
      transformResponse: (response: IResponse<ITourResponse>) => response.data,
    }),

    getSingleTour: builder.query<ITourPackage, string>({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ITourPackage>) => response.data,
    }),
  }),
});

export const { useCreateTourMutation, useUpdateTourMutation, useDeleteTourMutation, useCreateTourTypeMutation, useUpdateTourTypeMutation, useGetAllToursTypeQuery, useRemoveTourTypeMutation, useGetAllToursQuery, useGetSingleTourQuery } = tourApi;
