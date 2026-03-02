import { baseApi } from "../baseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (data) => ({
                url: "contact/create-contact",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["contact"],
        }),
    }),
});

export const { useCreateContactMutation } = contactApi;
