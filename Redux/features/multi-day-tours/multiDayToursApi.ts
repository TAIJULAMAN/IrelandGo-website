import { baseApi } from "../baseApi";

const multiDayToursApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllMultiDayTours: builder.query({
      query: () => ({
        url: "trip-services/multi-day-tour",
        method: "GET",
      }),
      providesTags: ["multiDayTours"],
    }),
  }),
});

export const { useGetAllMultiDayToursQuery } = multiDayToursApi;
