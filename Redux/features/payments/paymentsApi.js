import { baseApi } from "../baseApi";

export const paymentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPayments: builder.query({
            query: (params) => ({
                url: "paypal_payment/find_by_all_payment_list",
                method: "GET",
                params,
            }),
            providesTags: ["payments"],
        })
    }),
});

export const {
    useGetAllPaymentsQuery,
} = paymentsApi;
