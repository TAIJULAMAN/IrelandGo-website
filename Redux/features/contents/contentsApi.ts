import { baseApi } from "../baseApi";

const contentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivateTransfers: builder.query({
      query: () => ({
        url: "trip-services/private-transfer/popular",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    getPopularTrips: builder.query({
      query: () => ({
        url: "trip-services/day-trip/popular",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    getPopularMultiDayTours: builder.query({
      query: () => ({
        url: "trip-services/multi-day-tour/popular",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
  }),
});

export const {
  useGetPrivateTransfersQuery,
  useGetPopularTripsQuery,
  useGetPopularMultiDayToursQuery,
} = contentsApi;
