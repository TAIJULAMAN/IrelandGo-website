import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardData: builder.query({
      query: () => ({
        url: "statistics/user-dashboard-tab-info",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getAgentDashboardData: builder.query({
      query: () => ({
        url: "statistics/earnings-bookings-agent-dashboard",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetUserDashboardDataQuery, useGetAgentDashboardDataQuery } =
  dashboardApi;
