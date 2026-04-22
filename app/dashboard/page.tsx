"use client";

import {
  Users,
  MapPin,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { PageHeader } from "@/components/common/PageHeader";
import {
  useGetAgentDashboardDataQuery,
  useGetUserDashboardDataQuery,
} from "@/Redux/features/dashboard/dashboardApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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
  const recentBookings = dashboardData?.recentBookings || [];

  // Agent metrics
  const agentMetrics = [
    {
      id: 1,
      label: "Total Bookings",
      value: dashboardData?.totalBookings?.value || 0,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    // {
    //   id: 2,
    //   label: "Active Tours",
    //   value: "0",
    //   icon: <MapPin className="w-6 h-6 text-green-600" />,
    //   bg: "bg-green-100",
    // },
    {
      id: 3,
      label: "Revenue",
      value: `€${dashboardData?.totalEarnings?.value || 0}`,
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
    // {
    //   id: 4,
    //   label: "Growth",
    //   value: `${dashboardData?.totalEarnings?.growthOrDown || 0}%`,
    //   icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
    //   bg: "bg-orange-100",
    //   trend:
    //     (dashboardData?.totalEarnings?.growthOrDown || 0) >= 0 ? "up" : "down",
    // },
  ];

  // User metrics
  const userMetrics = [
    {
      id: 1,
      label: "Total Bookings",
      value: dashboardData?.totalBookings?.value || 0,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      id: 2,
      label: "Confirmed Trips",
      value: dashboardData?.totalConfirmedBookings || 0,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      id: 3,
      label: "Total Spent",
      value: `€${dashboardData?.totalSpent?.value || 0}`,
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  const metrics = isAgent ? agentMetrics : userMetrics;

  const renderStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none">
            Confirmed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none shadow-none">
            Pending
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none shadow-none">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="shadow-none">
            {status}
          </Badge>
        );
    }
  };

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

      {/* Metrics */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${isAgent ? "lg:grid-cols-2" : "md:grid-cols-3"} gap-5`}
      >
        {isLoading
          ? Array.from({ length: isAgent ? 4 : 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))
          : metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${metric.bg} rounded-full flex items-center justify-center`}
                  >
                    {metric.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                      {metric.label === "Growth" && (
                        <span
                          className={`flex items-center text-xs font-medium ${(metric as any).trend === "up" ? "text-green-600" : "text-red-600"}`}
                        >
                          {(metric as any).trend === "up" ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking: any, index: number) => (
                  <TableRow key={booking._id || booking.id || index}>
                    <TableCell className="font-medium">
                      {booking.clientName}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-0.5">
                        <p className="text-gray-900 font-medium truncate max-w-[150px]">
                          {booking.from}
                        </p>
                        <p className="text-gray-500 truncate max-w-[150px]">
                          to {booking.to}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs capitalize">
                        {booking.serviceType?.toLowerCase().replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500">
                          {booking.timeSlot?.start}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      €{booking.totalPrice}
                    </TableCell>
                    <TableCell>{renderStatusBadge(booking.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No recent bookings</p>
            {!isAgent && (
              <Link
                href="/transfer"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Book Your First Trip
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Upcoming Tours (Agent Only) */}
      {/* {isAgent && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Tours</h2>
                    <div className="text-center py-12">
                        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No upcoming tours scheduled</p>
                    </div>
                </div>
            )} */}
    </div>
  );
}
