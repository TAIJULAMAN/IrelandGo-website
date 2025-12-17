"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  Plus,
  Users,
  MapPin,
  Clock,
  CreditCard,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

const bookings = [
  {
    id: 1,
    clientName: "John Anderson",
    email: "john@gmail.com",
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
    clientName: "Sarah O'Brien",
    email: "sarah@email.com",
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
    clientName: "Michael Murphy",
    email: "michael@email.com",
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
    clientName: "Emma Walsh",
    email: "emma@email.com",
    pickup: "Waterford",
    destination: "Dublin City",
    date: "2024-12-18",
    time: "11:30 AM",
    passengers: 1,
    vehicleType: "Sedan",
    status: "Cancelled" as const,
    payment: "€120",
  },
];

export default function AgentBookingsPage() {
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    clientName: "",
    email: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    vehicleType: "",
  });

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
  const totalRevenue = bookings
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
      label: "Total Revenue",
      icon: <DollarSign className="h-5 w-5 text-purple-600" />,
      value: `€${totalRevenue.toFixed(0)}`,
      bgColor: "bg-purple-50",
    },
  ];

  // Handler functions
  const handleViewBooking = (booking: typeof bookings[0]) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEditBooking = (booking: typeof bookings[0]) => {
    setSelectedBooking(booking);
    setEditFormData({
      clientName: booking.clientName,
      email: booking.email,
      pickup: booking.pickup,
      destination: booking.destination,
      date: booking.date,
      time: booking.time,
      passengers: booking.passengers.toString(),
      vehicleType: booking.vehicleType,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteBooking = (booking: typeof bookings[0]) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    // TODO: Add API call to update booking
    console.log("Updating booking:", selectedBooking?.id, editFormData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Add API call to delete booking
    console.log("Deleting booking:", selectedBooking?.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <PageHeader
        title="Booking Management"
        description="Manage and track all client bookings"
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
                View and manage all bookings
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={() => setIsCreateBookingOpen(true)}
              >
                <Plus className="h-4 w-4" />
                New Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white font-semibold">Client</TableHead>
                  <TableHead className="text-white font-semibold">Route</TableHead>
                  <TableHead className="text-white font-semibold">Date & Time</TableHead>
                  <TableHead className="text-white font-semibold">Passengers</TableHead>
                  <TableHead className="text-white font-semibold">Vehicle</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                  <TableHead className="text-white font-semibold">Payment</TableHead>
                  <TableHead className="text-white font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {booking.clientName}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {booking.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-green-600" />
                            {booking.pickup}
                          </div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-red-600" />
                            {booking.destination}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <CalendarDays className="h-3 w-3 text-gray-400" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            {booking.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {booking.passengers}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {booking.vehicleType}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${booking.status === "Confirmed"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : booking.status === "Pending"
                              ? "bg-orange-50 text-orange-700 border border-orange-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                        >
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-gray-900">
                        {booking.payment}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            title="View Details"
                            onClick={() => handleViewBooking(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                            title="Edit Booking"
                            onClick={() => handleEditBooking(booking)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            title="Delete Booking"
                            onClick={() => handleDeleteBooking(booking)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create New Booking Modal */}
      <Dialog open={isCreateBookingOpen} onOpenChange={setIsCreateBookingOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-semibold">
              Create New Booking
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Fill in the details below to create a new booking.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="client" className="text-sm font-medium">
                  Select Client <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="client"
                    placeholder="Search by client name"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="pickup-location"
                  className="text-sm font-medium"
                >
                  Pickup Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="pickup-location"
                    placeholder="Enter pickup location"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="destination-location"
                  className="text-sm font-medium"
                >
                  Destination Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="destination-location"
                    placeholder="Enter destination location"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pickup-date" className="text-sm font-medium">
                  Pickup Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input id="pickup-date" type="date" className="pr-9" />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pickup-time" className="text-sm font-medium">
                  Pickup Time <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input id="pickup-time" type="time" className="pr-9" />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Clock className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="passengers" className="text-sm font-medium">
                  Number of Passengers <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="passengers"
                    type="number"
                    min={1}
                    placeholder="Enter number of passengers"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="vehicle-type" className="text-sm font-medium">
                  Select Vehicle Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="vehicle-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose vehicle type
                  </option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="minibus">Minibus</option>
                  <option value="luxury">Luxury Car</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="additional-luggage" />
                <Label
                  htmlFor="additional-luggage"
                  className="text-sm font-medium text-gray-700"
                >
                  Additional Luggage
                </Label>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="special-requests" className="text-sm font-medium">
                Special Requests (optional)
              </Label>
              <Textarea
                id="special-requests"
                placeholder="Enter any special requests (e.g., child seat required)"
                className="min-h-[96px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="payment-method" className="text-sm font-medium">
                Payment Method <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <select
                  id="payment-method"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  <option value="card">Credit / Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4" />
                </span>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateBookingOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Booking Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Booking Details</DialogTitle>
            <DialogDescription>
              View complete information about this booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Client Name</Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedBooking.clientName}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Status</Label>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${selectedBooking.status === "Confirmed"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : selectedBooking.status === "Pending"
                          ? "bg-orange-50 text-orange-700 border border-orange-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Email</Label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">{selectedBooking.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Pickup Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <p className="text-sm">{selectedBooking.pickup}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Destination</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <p className="text-sm">{selectedBooking.destination}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Pickup Date</Label>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Pickup Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedBooking.time}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Passengers</Label>
                  <p className="text-2xl font-bold text-blue-600">{selectedBooking.passengers}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Vehicle Type</Label>
                  <p className="text-2xl font-bold text-purple-600">{selectedBooking.vehicleType}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-600">Payment Amount</Label>
                <p className="text-3xl font-bold text-green-600">{selectedBooking.payment}</p>
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

      {/* Edit Booking Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking information below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-clientName" className="text-sm font-medium">
                  Client Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-clientName"
                  value={editFormData.clientName}
                  onChange={(e) => setEditFormData({ ...editFormData, clientName: e.target.value })}
                  placeholder="Enter client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-pickup" className="text-sm font-medium">
                  Pickup Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-pickup"
                  value={editFormData.pickup}
                  onChange={(e) => setEditFormData({ ...editFormData, pickup: e.target.value })}
                  placeholder="Enter pickup location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-destination" className="text-sm font-medium">
                  Destination <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-destination"
                  value={editFormData.destination}
                  onChange={(e) => setEditFormData({ ...editFormData, destination: e.target.value })}
                  placeholder="Enter destination"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date" className="text-sm font-medium">
                  Pickup Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editFormData.date}
                  onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time" className="text-sm font-medium">
                  Pickup Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editFormData.time}
                  onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-passengers" className="text-sm font-medium">
                  Passengers <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-passengers"
                  type="number"
                  min="1"
                  value={editFormData.passengers}
                  onChange={(e) => setEditFormData({ ...editFormData, passengers: e.target.value })}
                  placeholder="Number of passengers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-vehicleType" className="text-sm font-medium">
                  Vehicle Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="edit-vehicleType"
                  value={editFormData.vehicleType}
                  onChange={(e) => setEditFormData({ ...editFormData, vehicleType: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select vehicle type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                  <option value="Minibus">Minibus</option>
                  <option value="Luxury Car">Luxury Car</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-2">
                <p className="text-sm font-medium text-gray-900">
                  Client: <span className="font-bold">{selectedBooking.clientName}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Route: {selectedBooking.pickup} → {selectedBooking.destination}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}
                </p>
                <p className="text-sm text-gray-600">
                  Payment: {selectedBooking.payment}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
