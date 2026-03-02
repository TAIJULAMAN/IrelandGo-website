import { baseApi } from "../baseApi";

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFaq: builder.query({
            query: () => ({
                url: "faq/get-all-faqs",
                method: "GET",
            }),
            providesTags: ["faq"],
        }),
    }),
});

export const { useGetFaqQuery } =
    faqApi;
