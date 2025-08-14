import { baseApi } from "@/redux/baseApi";

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
    createTourType: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
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
    })
  }),
});

export const { useCreateTourMutation, useCreateTourTypeMutation, useGetAllToursTypeQuery, useRemoveTourTypeMutation } = tourApi;
