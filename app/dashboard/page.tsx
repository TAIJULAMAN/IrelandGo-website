"use client";

import { Users, MapPin, DollarSign, TrendingUp, Calendar, Clock } from "lucide-react";
import { useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { PageHeader } from "@/components/common/PageHeader";

export default function Dashboard() {
    const token = useAppSelector((state) => state.auth.token);
    const isAuthenticated = !!token;

    const { data: profileData } = useGetProfileQuery(undefined, {
        skip: !isAuthenticated,
    });

    const user = profileData?.data;
    const role = user?.role?.toLowerCase();
    const isAgent = role === "agent";

    // Agent metrics
    const agentMetrics = [
        { id: 1, label: "Total Clients", value: "0", icon: <Users className="w-6 h-6 text-blue-600" />, bg: "bg-blue-100" },
        { id: 2, label: "Active Tours", value: "0", icon: <MapPin className="w-6 h-6 text-green-600" />, bg: "bg-green-100" },
        { id: 3, label: "Revenue", value: "€0", icon: <DollarSign className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100" },
        { id: 4, label: "Growth", value: "0%", icon: <TrendingUp className="w-6 h-6 text-orange-600" />, bg: "bg-orange-100" },
    ];

    // User metrics
    const userMetrics = [
        { id: 1, label: "Active Bookings", value: "0", icon: <Calendar className="w-6 h-6 text-blue-600" />, bg: "bg-blue-100" },
        { id: 2, label: "Completed Trips", value: "0", icon: <MapPin className="w-6 h-6 text-green-600" />, bg: "bg-green-100" },
        { id: 3, label: "Pending", value: "0", icon: <Clock className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100" },
    ];

    const metrics = isAgent ? agentMetrics : userMetrics;

    return (
        <div className="flex flex-col gap-5 pb-5">
            <PageHeader
                title="Dashboard"
                description="View and manage all your client information"
            />
            {/* Metrics */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAgent ? "lg:grid-cols-4" : "md:grid-cols-3"} gap-5`}>
                {metrics.map((metric) => (
                    <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${metric.bg} rounded-full flex items-center justify-center`}>
                                {metric.icon}
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                <p className="text-sm text-gray-600">{metric.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content based on role */}
            {isAgent ? (
                <div className="flex flex-col gap-5">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Tours</h2>
                        <div className="text-center py-12">
                            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">No upcoming tours</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">No recent bookings</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No bookings yet</p>
                        <a href="/transfer" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Book Your First Trip
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
