import { baseApi } from "../baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "legalDoc/get-doc/privacyPolicy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery } = privacyApi;
