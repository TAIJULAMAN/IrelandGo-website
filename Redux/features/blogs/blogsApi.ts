import { baseApi } from "../baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: "blogs",
                method: "GET",
            }),
            providesTags: ["blog"],
        }),

    }),
});

export const { useGetAllBlogsQuery } = blogApi;
