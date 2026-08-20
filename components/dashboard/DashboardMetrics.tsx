import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardMetricsProps {
  isLoading: boolean;
  isAgent: boolean;
  dashboardData: any;
}

export function DashboardMetrics({
  isLoading,
  isAgent,
  dashboardData,
}: DashboardMetricsProps) {
  const agentMetrics = [
    {
      id: 1,
      label: "Total Bookings",
      value: dashboardData?.totalBookings?.value || 0,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50/50 border border-blue-100 text-blue-600",
      accent: "bg-blue-500",
    },
    {
      id: 3,
      label: "Revenue",
      value: `€${dashboardData?.totalEarnings?.value.toFixed(2) || 0}`,
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50/50 border border-emerald-100 text-emerald-600",
      accent: "bg-emerald-500",
    },
  ];

  const userMetrics = [
    {
      id: 1,
      label: "Total Bookings",
      value: dashboardData?.totalBookings?.value || 0,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50/50 border border-blue-100 text-blue-600",
      accent: "bg-blue-500",
    },
    {
      id: 2,
      label: "Confirmed Trips",
      value: dashboardData?.totalConfirmedBookings || 0,
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50/50 border border-indigo-100 text-indigo-600",
      accent: "bg-indigo-500",
    },
    {
      id: 3,
      label: "Total Spent",
      value: `€${dashboardData?.totalSpent?.value?.toFixed(2) || 0}`,
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50/50 border border-emerald-100 text-emerald-600",
      accent: "bg-emerald-500",
    },
  ];

  const metrics = isAgent ? agentMetrics : userMetrics;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${isAgent ? "lg:grid-cols-2" : "md:grid-cols-3"} gap-6`}
    >
      {isLoading
        ? Array.from({ length: isAgent ? 2 : 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-5"
          >
            <Skeleton className="w-14 h-14 rounded-2xl" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))
        : metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-5 relative z-10">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${metric.bg}`}
              >
                {metric.icon}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                    {metric.value}
                  </p>
                  {metric.label === "Growth" && (
                    <span
                      className={`flex items-center text-xs font-medium ${(metric as any).trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {(metric as any).trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.03] group-hover:scale-[1.3] transition-transform duration-500 blur-2xl ${metric.accent}`}></div>
          </div>
        ))}
    </div>
  );
}
