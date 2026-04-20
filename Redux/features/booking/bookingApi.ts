import { baseApi } from "../baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (params) => ({
        url: "statistics/agent-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingApi;
