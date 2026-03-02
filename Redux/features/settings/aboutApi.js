import { baseApi } from "../baseApi";

const aboutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAbout: builder.query({
            query: () => ({
                url: "setting/find_by_about_us",
                method: "GET",
            }),
            providesTags: ["about"],
        }),
        createAbout: builder.mutation({
            query: ({ aboutUs }) => ({
                url: "setting/about",
                method: "POST",
                body: { aboutUs },
            }),
            invalidatesTags: ["about"],
        }),
    }),
});

export const { useGetAboutQuery, useCreateAboutMutation } =
    aboutApi;
