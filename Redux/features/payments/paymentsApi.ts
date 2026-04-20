import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (data) => {
        return {
          url: "payments/stripe-account-onboarding",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["payment-methods"],
    }),
  }),
});

export const { usePaymentMutation } = paymentApi;

export default paymentApi;
