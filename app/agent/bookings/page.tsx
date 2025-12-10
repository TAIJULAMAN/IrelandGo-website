"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Search,
  Users,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react";

const bookings = [
  {
    id: 1,
    clientName: "John Anderson",
    email: "john@gmail.com",
    trip: "Bali Adventure",
    tripMeta: "7 days • 2 guests",
    date: "15-12-25",
    status: "Confirmed" as const,
    payment: "$2,450",
  },
  {
    id: 2,
    clientName: "John Anderson",
    email: "john@gmail.com",
    trip: "Bali Adventure",
    tripMeta: "7 days • 2 guests",
    date: "15-12-25",
    status: "Pending" as const,
    payment: "$2,450",
  },
  {
    id: 3,
    clientName: "John Anderson",
    email: "john@gmail.com",
    trip: "Bali Adventure",
    tripMeta: "7 days • 2 guests",
    date: "15-12-25",
    status: "Confirmed" as const,
    payment: "$2,450",
  },
];

const statusStyles: Record<(typeof bookings)[number]["status"], string> = {
  Confirmed:
    "bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-3 py-0.5 text-xs font-medium",
  Pending:
    "bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-0.5 text-xs font-medium",
};

export default function AgentBookingsPage() {
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Booking Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track all client bookings
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-5"
          onClick={() => setIsCreateBookingOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </header>

      {/* Filters */}
      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Filters</CardTitle>
          <button className="text-xs font-medium text-blue-600 hover:underline">
            Clear All
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Status
              </label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Date From
              </label>
              <div className="relative">
                <Input type="date" className="pr-9" />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Date To
              </label>
              <div className="relative">
                <Input type="date" className="pr-9" />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="relative w-full sm:w-64">
              <Input placeholder="Search bookings" className="pl-9" />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Search className="h-4 w-4" />
              </span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-800 bg-white"
              >
                <Filter className="h-4 w-4" />
                Advanced
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Booking Modal from New Booking button */}
      <Dialog open={isCreateBookingOpen} onOpenChange={setIsCreateBookingOpen}>
        <DialogContent className="max-w-3xl">
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose vehicle type
                  </option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="minibus">Minibus</option>
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
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

      {/* Bookings Table */}
      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Bookings</CardTitle>
            <p className="text-xs text-gray-500">247 total bookings</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <button
              className="rounded-md p-1.5 hover:bg-gray-100"
              aria-label="Export"
            />
            <button
              className="rounded-md p-1.5 hover:bg-gray-100"
              aria-label="Download"
            />
            <button
              className="rounded-md p-1.5 hover:bg-gray-100"
              aria-label="Settings"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-xs font-semibold text-gray-500">
                    SL
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">
                    Client Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">
                    Trip
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">
                    Payment
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={booking.id} className="text-sm">
                    <TableCell className="text-xs text-gray-500">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/miniavs/svg?seed=John" />
                          <AvatarFallback>JA</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-gray-900 text-sm">
                            {booking.clientName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.trip}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.tripMeta}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {booking.date}
                    </TableCell>
                    <TableCell>
                      <span className={statusStyles[booking.status]}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-gray-900">
                      {booking.payment}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2 text-blue-500 text-sm">
                        <button
                          className="hover:text-blue-700"
                          aria-label="View"
                        >
                          👁
                        </button>
                        <button
                          className="hover:text-blue-700"
                          aria-label="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="hover:text-blue-700"
                          aria-label="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination summary */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-4 text-xs text-gray-500">
            <p>results 247 of 10 to 1 Showing</p>
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 rounded-md border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50">
                1
              </button>
              <button className="h-8 w-8 rounded-md border border-transparent text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50">
                2
              </button>
              <button className="h-8 w-8 rounded-md border border-transparent text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50">
                3
              </button>
              <span className="px-1 text-gray-400">...</span>
              <button className="h-8 w-8 rounded-md border border-transparent text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50">
                25
              </button>
              <button className="ml-1 h-8 w-8 rounded-md border border-gray-200 text-gray-600 text-sm flex items-center justify-center hover:bg-gray-50">
                
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
