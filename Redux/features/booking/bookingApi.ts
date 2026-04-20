import { baseApi } from "../baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgentBookings: builder.query({
      query: (params) => ({
        url: "statistics/agent-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["booking"],
    }),
    getAllUserBookings: builder.query({
      query: (params) => ({
        url: "statistics/user-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const { useGetAllAgentBookingsQuery, useGetAllUserBookingsQuery } =
  bookingApi;
