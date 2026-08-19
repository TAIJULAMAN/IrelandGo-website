import { baseApi } from "../baseApi";

export const onboardingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOnboarding: builder.mutation<any, void>({
            query: () => ({
                url: "payments/stripe-account-onboarding",
                method: "POST",
            }),
            invalidatesTags: ["payment-methods"],
        }),
    }),
});

export const {
    useCreateOnboardingMutation
} = onboardingApi;