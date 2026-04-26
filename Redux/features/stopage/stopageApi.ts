import { baseApi } from "../baseApi";

const stopageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStops: builder.query({
      query: () => ({
        url: `stoppages`,
        method: "GET",
      }),
      providesTags: ["stopages"],
    }),
  }),
});

export const { useGetStopsQuery } = stopageApi;
