import { baseApi } from "../baseApi";

interface PrivacyPolicy {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface PrivacyResponse {
  success: boolean;
  message: string;
  data: PrivacyPolicy;
}

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query<PrivacyResponse, void>({
      query: () => ({
        url: "policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery } = privacyApi;
