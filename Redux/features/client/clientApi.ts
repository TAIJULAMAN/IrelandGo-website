import { baseApi } from "../baseApi";

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: (params) => ({
        url: "users/get-client-by-agent",
        method: "GET",
        params,
      }),
      providesTags: ["client"],
    }),
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/update-client/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["client"],
    }),
    addClient: builder.mutation({
      query: ({ data }) => ({
        url: "users/create-client",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useUpdateClientMutation,
  useAddClientMutation,
} = clientApi;
