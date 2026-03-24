import { baseApi } from "../baseApi";

const supportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        supportByMail: builder.mutation({
            query: (data) => {
                return {
                    url: "reports/support-by-mail",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["support"],
        })
    }),
});

export const {
    useSupportByMailMutation,
} = supportApi;

export default supportApi;
