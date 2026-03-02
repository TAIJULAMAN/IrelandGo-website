import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    topHosts: builder.query({
      query: () => ({
        url: "user/discover-host",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    topInfluencers: builder.query({
      query: () => ({
        url: "user/top-influencer",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `user/single-user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    myProfile: builder.query({
      query: () => ({
        url: "auth/my-profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => ({
        url: "user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useTopHostsQuery,
  useTopInfluencersQuery,
  useGetUserByIdQuery,
  useMyProfileQuery,
  useUpdateProfileMutation
} = userApi;
