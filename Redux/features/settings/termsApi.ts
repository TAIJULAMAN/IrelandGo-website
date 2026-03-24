import { baseApi } from "../baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "terms-conditions",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),
  }),
});

export const { useGetTermsAndConditionsQuery } =
  termsAndConditionsApi;
