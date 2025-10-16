import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["Bookings"],
    }),
    myBooking: builder.query({
      query: (query) => ({
        url: `/booking/my-bookings?page=${query.page}&limit=${query.limit}&status=${query.status}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Bookings"],
    }), 
  }),
});

export const { useCreateBookingMutation, useMyBookingQuery } = bookingApi;
