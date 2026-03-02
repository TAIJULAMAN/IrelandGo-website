import { baseApi } from "../baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransaction: builder.query({
            query: (params) => ({
                url: "transactions/user-transaction",
                method: "GET",
                params,
            }),
            providesTags: ["transaction"],
        }),
    }),
});

export const {
    useGetTransactionQuery,
} = transactionApi;
