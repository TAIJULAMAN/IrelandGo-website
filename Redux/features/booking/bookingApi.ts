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
    createBookingUsingServiceId: builder.mutation({
      query: ({ serviceId, body }) => ({
        url: `trip-service-booking/${serviceId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["booking"],
    }),
    createBookingWithoutId: builder.mutation({
      query: ({ body }) => ({
        url: `trip-service-booking/create-booking`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `trip-service-booking/update-booking/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllAgentBookingsQuery,
  useGetAllUserBookingsQuery,
  useCreateBookingUsingServiceIdMutation,
  useCreateBookingWithoutIdMutation,
  useUpdateBookingStatusMutation
} = bookingApi;
