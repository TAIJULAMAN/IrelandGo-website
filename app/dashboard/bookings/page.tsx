"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
  Loader2,
} from "lucide-react";
import { useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { useGetAllAgentBookingsQuery, useGetAllUserBookingsQuery } from "@/Redux/features/booking/bookingApi";

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
    isError: agentError 
  } = useGetAllAgentBookingsQuery({}, { skip: !isAuthenticated || !isAgent });

  const { 
    data: userData, 
    isLoading: userLoading, 
    isError: userError 
  } = useGetAllUserBookingsQuery({}, { skip: !isAuthenticated || isAgent });

  const isLoading = agentLoading || userLoading;
  const isError = agentError || userError;
  const data = isAgent ? agentData : userData;

  const bookingsData = data?.data?.recentBookings || [];

  // Filter bookings based on status
  const filteredBookings = bookingsData.filter((booking: any) => {
    const matchesStatus =
      statusFilter === "all" ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesStatus;
  });

  const stats = [
    {
      id: 1,
      label: "Total Bookings",
      icon: <CalendarDays className="h-5 w-5 text-blue-600" />,
      value: data?.data?.totalBookings || 0,
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Confirmed",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      value: data?.data?.totalConfirmedBookings || 0,
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Completed",
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      value: data?.data?.totalCompletedBookings || 0,
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      label: "Total Earnings",
      icon: <DollarSign className="h-5 w-5 text-purple-600" />,
      value: `€${data?.data?.totalEarnings || 0}`,
      bgColor: "bg-purple-50",
    },
  ];

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <PageHeader
        title="My Bookings"
        description="View and manage all your travel bookings"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className={`${stat.bgColor} border-none shadow-sm hover:shadow-md transition-shadow`}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bookings Table */}
      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">Bookings List</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                View all your travel bookings
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center flex-col items-center py-12 gap-3 text-gray-500">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p>Loading bookings...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">
              Failed to load bookings. Please try again.
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bookings found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-600 hover:bg-blue-600">
                    <TableHead className="font-semibold text-white rounded-tl-lg">
                      Route
                    </TableHead>
                    <TableHead className="font-semibold text-white">
                      Date & Time
                    </TableHead>
                    <TableHead className="font-semibold text-white">
                      Client Name
                    </TableHead>
                    <TableHead className="font-semibold text-white">
                      Type
                    </TableHead>
                    <TableHead className="font-semibold text-white">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-white">
                      Payment
                    </TableHead>
                    <TableHead className="font-semibold text-white text-right rounded-tr-lg">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking: any, index: number) => (
                    <TableRow
                      key={booking._id || booking.id || index}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-sm">
                              {booking.from}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-sm">
                              {booking.to}
                            </span>
                          </div>
                          {booking.isReturn && (
                            <span className="text-xs text-blue-600 font-medium ml-6">
                              (Return Trip)
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <div className="font-medium">
                              {new Date(
                                booking.date || booking.createdAt,
                              ).toLocaleDateString()}
                            </div>
                            <div className="text-gray-500">
                              {booking.timeSlot?.start}{" "}
                              {booking.timeSlot?.end
                                ? `- ${booking.timeSlot.end}`
                                : ""}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{booking.clientName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {booking.serviceType?.replace(/_/g, " ")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium uppercase ${
                            booking.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "PENDING"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status === "CONFIRMED" && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                          {booking.status === "PENDING" && (
                            <Clock className="h-3 w-3" />
                          )}
                          {(booking.status === "CANCELLED" ||
                            booking.status === "REJECTED") && (
                            <XCircle className="h-3 w-3" />
                          )}
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-sm">
                        €{booking.totalPrice}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewBooking(booking)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Booking Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Booking Details</DialogTitle>
            <DialogDescription>
              View complete information about your booking
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium uppercase ${
                    selectedBooking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : selectedBooking.status === "PENDING"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedBooking.status === "CONFIRMED" && (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {selectedBooking.status === "PENDING" && (
                    <Clock className="h-4 w-4" />
                  )}
                  {(selectedBooking.status === "CANCELLED" ||
                    selectedBooking.status === "REJECTED") && (
                    <XCircle className="h-4 w-4" />
                  )}
                  {selectedBooking.status}
                </span>
              </div>

              {/* Trip Details */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium">{selectedBooking.from}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-medium">
                        {selectedBooking.to}{" "}
                        {selectedBooking.isReturn && (
                          <span className="text-blue-600 text-xs ml-1">
                            (Return)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CalendarDays className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">
                        {new Date(
                          selectedBooking.date || selectedBooking.createdAt,
                        ).toLocaleDateString()}
                        <br />
                        {selectedBooking.timeSlot?.start}{" "}
                        {selectedBooking.timeSlot?.end
                          ? ` - ${selectedBooking.timeSlot.end}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Client Info</p>
                      <p className="font-medium">
                        {selectedBooking.clientName}
                        <br />
                        <span className="text-xs text-gray-500 font-normal">
                          {selectedBooking.user?.email}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-900">Total Price</span>
                <span className="text-2xl font-bold text-blue-600">
                  €{selectedBooking.totalPrice}
                </span>
              </div>

              {selectedBooking.payments?.[0]?.agent_commission && (
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg mt-2">
                  <span className="font-semibold text-gray-900">
                    Your Commission
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    €{selectedBooking.payments[0].agent_commission}
                  </span>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
