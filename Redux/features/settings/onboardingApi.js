import { baseApi } from "../baseApi";

export const onboardingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOnboarding: builder.mutation({
            query: () => ({
                url: "payment/stripe-account-onboarding",
                method: "POST",
            }),
            invalidatesTags: ["onboarding"],
        }),
    }),
});

export const {
    useCreateOnboardingMutation
} = onboardingApi;