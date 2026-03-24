import { baseApi } from "../baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery } = privacyApi;
