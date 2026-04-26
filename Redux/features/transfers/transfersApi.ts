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
  }),
});

export const { useGetTransfersBasedOnLocationQuery } = transfersApi;
