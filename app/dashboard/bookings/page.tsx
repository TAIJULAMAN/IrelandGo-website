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

  const {
    data: agentData,
    isLoading: agentLoading,
    isError: agentError,
  } = useGetAllAgentBookingsQuery({}, { skip: !isAuthenticated || !isAgent });

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUserBookingsQuery({}, { skip: !isAuthenticated || isAgent });

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
