import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: ({ bookingId, data }: any) => {
        // console.log("bookingId", bookingId);
        // console.log("data", data);
        return {
          url: `payments/create-stripe-checkout-session/${bookingId}`,
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
