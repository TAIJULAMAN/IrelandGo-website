import { baseApi } from "../baseApi";

const aboutUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAboutUs: builder.query({
            query: () => ({
                url: "legalDoc/get-doc/aboutUs",
                method: "GET",
            }),
            providesTags: ["aboutUs"],
        }),
    }),
});

export const { useGetAboutUsQuery } = aboutUsApi;
