"use client";

import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { PageHeader } from "@/components/common/PageHeader";
import {
  useGetAgentDashboardDataQuery,
  useGetUserDashboardDataQuery,
} from "@/Redux/features/dashboard/dashboardApi";
import { RecentBookingsTable } from "@/components/dashboard/RecentBookingsTable";

export default function Dashboard() {
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = !!token;

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const user = profileData?.data;
  const role = user?.role?.toLowerCase();
  const isAgent = role === "agent";

  const { data: agentDashboardData, isLoading: agentLoading } =
    useGetAgentDashboardDataQuery(undefined, {
      skip: !isAuthenticated || !isAgent,
    });

  const { data: userDashboardData, isLoading: userLoading } =
    useGetUserDashboardDataQuery(undefined, {
      skip: !isAuthenticated || isAgent,
    });

  const isLoading = agentLoading || userLoading;
  const dashboardData = isAgent
    ? agentDashboardData?.data
    : userDashboardData?.data;
  const recentBookings = dashboardData?.recentBookings?.slice(0, 5) || [];



  return (
    <div className="flex flex-col gap-5 pb-5">
      <PageHeader
        title="Dashboard"
        description={
          isAgent
            ? "View and manage your earnings and client bookings"
            : "Manage your bookings and view your travel history"
        }
      />
      <DashboardMetrics
        isLoading={isLoading}
        isAgent={isAgent}
        dashboardData={dashboardData}
      />
      <RecentBookingsTable
        isLoading={isLoading}
        recentBookings={recentBookings}
        isAgent={isAgent}
      />
    </div>
  );
}
