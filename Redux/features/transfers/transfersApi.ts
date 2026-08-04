import { baseApi } from "../baseApi";

const transfersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransfersBasedOnLocation: builder.query({
      query: (location) => ({
        url: `trip-services/from-location/${location}`,
        method: "GET",
      }),
      providesTags: ["transfers"],
    }),
    getAllPrivateTransferBasedOnLocation: builder.query({
      query: (params) => ({
        url: "trip-services/private-transfer/from-location-group",
        method: "GET",
        params,
      }),
      providesTags: ["transfers"],
    }),
    getAllAirportTransferBasedOnLocation: builder.query({
      query: (params) => ({
        url: "trip-services/airport-transfer/from-location-group",
        method: "GET",
        params,
      }),
      providesTags: ["transfers"],
    }),
  }),
});

export const { useGetTransfersBasedOnLocationQuery, useGetAllPrivateTransferBasedOnLocationQuery, useGetAllAirportTransferBasedOnLocationQuery } = transfersApi;


