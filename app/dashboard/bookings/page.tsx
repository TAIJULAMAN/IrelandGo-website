"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { BookingsStats } from "@/components/dashboard/BookingsStats";
import { BookingsTable } from "@/components/dashboard/BookingsTable";
import { ViewBookingModal } from "@/components/dashboard/ViewBookingModal";
import { useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import {
  useGetAllAgentBookingsQuery,
  useGetAllUserBookingsQuery,
} from "@/Redux/features/booking/bookingApi";
import { AlertCircle } from "lucide-react";
import Link from "next/link";


export default function UserBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = !!token;

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const user = profileData?.data;
  const role = user?.role?.toLowerCase();
  const isAgent = role === "agent";

  const isStripeConnected =
    user?.isStripeConnected === true ||
    user?.stripeConnected === true ||
    user?.stripeOnboarded === true ||
    user?.stripeOnboardingCompleted === true ||
    !!user?.stripeAccountId;


  const {
    data: agentData,
    isLoading: agentLoading,
    isError: agentError,
  } = useGetAllAgentBookingsQuery({}, { skip: !isAuthenticated || !isAgent });

  console.log("Agent Data:", agentData);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUserBookingsQuery({}, { skip: !isAuthenticated || isAgent });

  console.log("User Data:", userData);

  const isLoading = agentLoading || userLoading;
  const isError = agentError || userError;
  const data = isAgent ? agentData : userData;
  const bookingsData = data?.data?.data || data?.data?.recentBookings || [];
  const filteredBookings = bookingsData.filter((booking: any) => {
    const matchesStatus =
      statusFilter === "all" ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesStatus;
  });

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      <PageHeader
        title="My Bookings"
        description="View and manage all your travel bookings"
      />
      {isAgent && !isStripeConnected && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-medium text-[15px]">Complete Your Onboarding</h3>
              <p className="text-red-600 text-[14px] mt-1">
                You must complete your payment onboarding before you can receive and manage bookings.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/payment-methods"
            className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-[14px] font-medium transition-colors"
          >
            Complete Onboarding
          </Link>
        </div>
      )}
      <BookingsStats isAgent={isAgent} data={data} />
      <BookingsTable
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        isLoading={isLoading}
        isError={isError}
        filteredBookings={filteredBookings}
        handleViewBooking={handleViewBooking}
      />
      <ViewBookingModal
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        booking={selectedBooking}
      />
    </div>
  );
}
