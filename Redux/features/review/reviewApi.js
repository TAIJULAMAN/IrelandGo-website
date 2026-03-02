import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReview: builder.query({
            query: () => ({
                url: "review/all-reviews",
                method: "GET",
            }),
            providesTags: ["review"],
        }),
        getReviewById: builder.query({
            query: (id) => ({
                url: `review/user/${id}`,
                method: "GET",
            }),
            providesTags: ["review"],
        }),

    }),
});

export const { useGetAllReviewQuery, useGetReviewByIdQuery } = reviewApi;
