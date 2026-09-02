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
      providesTags: ["stopages"],
    }),
    addExtraStoppages: builder.mutation({
      query: (data) => ({
        url: `stoppages/add-extra-stoppage`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stopages"],
    }),
  }),
  overrideExisting: true,
});

export const { useSearchPopularStopsMutation, useGetSingleStoppageQuery, useAddExtraStoppagesMutation } = stopageApi;
