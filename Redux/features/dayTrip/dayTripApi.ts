import { baseApi } from "../baseApi";

const dayTripApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllDayTrips: builder.query({
            query: () => ({
                url: "trip-services/day-trip",
                method: "GET",
            }),
            providesTags: ["dayTrips"],
        }),
        getSingleDayTrip: builder.query({
            query: (id) => ({
                url: `trip-services/${id}`,
                method: "GET",
            }),
            providesTags: ["dayTrips"],
        }),
    }),
});

export const { useGetAllDayTripsQuery, useGetSingleDayTripQuery } = dayTripApi;
