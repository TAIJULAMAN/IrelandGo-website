import { baseApi } from "../baseApi";

interface About {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface AboutResponse {
  success: boolean;
  message: string;
  data: About;
}

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<AboutResponse, void>({
      query: () => ({
        url: "about",
        method: "GET",
      }),
      providesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery } = aboutApi;
