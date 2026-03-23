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
  Filter,
  MapPin,
  Clock,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

const bookings = [
  {
    id: 1,
    pickup: "Dublin Airport",
    destination: "Galway City",
    date: "2024-12-20",
    time: "10:00 AM",
    passengers: 2,
    vehicleType: "Sedan",
    status: "Confirmed" as const,
    payment: "€145",
  },
  {
    id: 2,
    pickup: "Cork City",
    destination: "Killarney",
    date: "2024-12-22",
    time: "2:30 PM",
    passengers: 4,
    vehicleType: "SUV",
    status: "Pending" as const,
    payment: "€180",
  },
  {
    id: 3,
    pickup: "Limerick",
    destination: "Cliffs of Moher",
    date: "2024-12-25",
    time: "9:00 AM",
    passengers: 6,
    vehicleType: "Van",
    status: "Confirmed" as const,
    payment: "€220",
  },
  {
    id: 4,
    pickup: "Waterford",
    destination: "Dublin City",
    date: "2024-12-18",
    time: "11:30 AM",
    passengers: 1,
    vehicleType: "Sedan",
    status: "Cancelled" as const,
    payment: "€120",
  },
  {
    id: 5,
    pickup: "Dublin City",
    destination: "Belfast",
    date: "2024-12-30",
    time: "8:00 AM",
    passengers: 3,
    vehicleType: "SUV",
    status: "Confirmed" as const,
    payment: "€195",
  },
];

export default function UserBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter bookings based on status
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesStatus;
  });

  // Calculate statistics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const totalSpent = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, booking) => {
      const amount = parseFloat(booking.payment.replace(/[€,]/g, ""));
      return sum + amount;
    }, 0);

  const stats = [
    {
      id: 1,
      label: "Total Bookings",
      icon: <CalendarDays className="h-5 w-5 text-blue-600" />,
      value: totalBookings,
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Confirmed",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      value: confirmedBookings,
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Pending",
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      value: pendingBookings,
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      label: "Total Spent",
      icon: <DollarSign className="h-5 w-5 text-purple-600" />,
      value: `€${totalSpent.toFixed(0)}`,
      bgColor: "bg-purple-50",
    },
  ];

  const handleViewBooking = (booking: typeof bookings[0]) => {
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
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="font-semibold text-white rounded-tl-lg">Route</TableHead>
                  <TableHead className="font-semibold text-white">Date & Time</TableHead>
                  <TableHead className="font-semibold text-white">Passengers</TableHead>
                  <TableHead className="font-semibold text-white">Vehicle</TableHead>
                  <TableHead className="font-semibold text-white">Status</TableHead>
                  <TableHead className="font-semibold text-white">Payment</TableHead>
                  <TableHead className="font-semibold text-white text-right rounded-tr-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-sm">{booking.pickup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-sm">{booking.destination}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        <div className="text-sm">
                          <div className="font-medium">
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500">{booking.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{booking.passengers}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{booking.vehicleType}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {booking.status === "Confirmed" && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {booking.status === "Pending" && (
                          <Clock className="h-3 w-3" />
                        )}
                        {booking.status === "Cancelled" && (
                          <XCircle className="h-3 w-3" />
                        )}
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-sm">
                      {booking.payment}
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
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${selectedBooking.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : selectedBooking.status === "Pending"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {selectedBooking.status === "Confirmed" && (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {selectedBooking.status === "Pending" && (
                    <Clock className="h-4 w-4" />
                  )}
                  {selectedBooking.status === "Cancelled" && (
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
                      <p className="font-medium">{selectedBooking.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-medium">{selectedBooking.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CalendarDays className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">
                        {new Date(selectedBooking.date).toLocaleDateString()} at{" "}
                        {selectedBooking.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Passengers</p>
                      <p className="font-medium">
                        {selectedBooking.passengers}{" "}
                        {selectedBooking.passengers === 1 ? "Person" : "People"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  {selectedBooking.payment}
                </span>
              </div>
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
