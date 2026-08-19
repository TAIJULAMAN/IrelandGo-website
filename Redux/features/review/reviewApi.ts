import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReview: builder.query({
            query: () => ({
                url: "reviews/service-all-reviews",
                method: "GET",
            }),
            providesTags: ["review"],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: "reviews/service",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["review"],
        }),
    }),
});

export const { useGetAllReviewQuery, useCreateReviewMutation } = reviewApi;
