import { baseApi } from "../baseApi";

const stopageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPopularStops: builder.mutation({
      query: (data) => ({
        url: `stoppages/search-stoppage/popular`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSearchPopularStopsMutation } = stopageApi;
