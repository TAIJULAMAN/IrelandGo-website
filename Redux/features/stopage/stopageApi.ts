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
    addExtraStoppages: builder.mutation({
      query: (data) => ({
        url: `stoppages/add-extra-stoppage`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSearchPopularStopsMutation, useGetSingleStoppageQuery, useAddExtraStoppagesMutation } = stopageApi;
