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
        getAllDayTripsBasedOnLocation: builder.query({
            query: () => ({
                url: `trip-services/private-transfer/from-location-group`,
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

export const { useGetAllDayTripsQuery, useGetSingleDayTripQuery, useGetAllDayTripsBasedOnLocationQuery } = dayTripApi;
