import { baseApi } from "../baseApi";

const stopageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPopularStops: builder.mutation({
      query: (data) => ({
        url: `stoppages/search-stoppage`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleStoppage: builder.query({
      query: (id) => `stoppages/single-stoppage/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useSearchPopularStopsMutation, useGetSingleStoppageQuery } = stopageApi;
