"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  Clock as ClockIcon,
  Calendar,
  ArrowRight,
  MoreHorizontal,
  X,
  AlertCircle,
  Check,
  CreditCard,
  User,
  Navigation,
  CalendarDays,
  Clock9,
  MapPin as MapPinIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface BookingCardProps {
  id: string;
  status: "upcoming" | "completed" | "cancelled";
  pickupLocation: string;
  pickupDetail: string;
  destination: string;
  destinationDetail: string;
  date: string;
  time: string;
  passengers: number;
  duration: string;
  price: string;
  refundStatus?: string;
  onModify?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onCancel?: (id: string) => void;
  onRateTrip?: (id: string) => void;
  onRebook?: (id: string) => void;
  onMoreActions?: (id: string) => void;
}

const BookingCard = ({
  id,
  status,
  pickupLocation,
  pickupDetail,
  destination,
  destinationDetail,
  date,
  time,
  passengers,
  duration,
  price,
  refundStatus,
  onModify,
  onViewDetails,
  onCancel,
  onRateTrip,
  onRebook,
}: BookingCardProps) => {
  const statusConfig = {
    upcoming: {
      icon: <Clock className="h-4 w-4" />,
      text: "Upcoming",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    completed: {
      icon: <CheckCircle className="h-4 w-4" />,
      text: "Completed",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    cancelled: {
      icon: <XCircle className="h-4 w-4" />,
      text: "Cancelled",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
  };

  const statusInfo = statusConfig[status];

  return (
    <div className="border rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-500 text-sm">
            Booking ID: {id}
          </h3>
          <div className="flex items-center mt-1">
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
            >
              {statusInfo.icon}
              <span className="ml-1">{statusInfo.text}</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails?.(id)}>
              View Details
            </DropdownMenuItem>
            {status === "upcoming" && (
              <>
                <DropdownMenuItem onClick={() => onModify?.(id)}>
                  Modify Booking
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onCancel?.(id)}
                >
                  Cancel Booking
                </DropdownMenuItem>
              </>
            )}
            {status === "completed" && (
              <DropdownMenuItem onClick={() => onRateTrip?.(id)}>
                Rate Trip
              </DropdownMenuItem>
            )}
            {status === "cancelled" && (
              <DropdownMenuItem onClick={() => onRebook?.(id)}>
                Rebook
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{pickupLocation}</p>
            <p className="text-sm text-gray-500">{pickupDetail}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-5 w-0.5 bg-gray-300"></div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{destination}</p>
            <p className="text-sm text-gray-500">{destinationDetail}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span>
              {date}, {time}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-500 mr-2" />
            <span>
              {passengers} {passengers > 1 ? "Passengers" : "Passenger"}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">{price}</span>
          </div>
        </div>
      </div>

      {status === "upcoming" && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onModify?.(id)}>
            Modify
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(id)}
          >
            View Details
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancel?.(id)}
          >
            Cancel
          </Button>
        </div>
      )}

      {status === "completed" && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(id)}
          >
            View Details
          </Button>
          <Button size="sm" onClick={() => onRateTrip?.(id)}>
            Rate Trip
          </Button>
        </div>
      )}

      {status === "cancelled" && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{refundStatus}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails?.(id)}
              >
                View Details
              </Button>
              <Button size="sm" onClick={() => onRebook?.(id)}>
                Rebook
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function BookingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [selectedBooking, setSelectedBooking] =
    useState<BookingCardProps | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [bookings, setBookings] = useState<BookingCardProps[]>([
    {
      id: "#12345",
      status: "upcoming",
      pickupLocation: "Dublin Airport",
      pickupDetail: "Terminal 2, Arrivals",
      destination: "Galway City",
      destinationDetail: "City Center",
      date: "12th Nov 2025",
      time: "10:00 AM",
      passengers: 2,
      duration: "2h 30m",
      price: "€120.00",
    },
    {
      id: "#12346",
      status: "completed",
      pickupLocation: "Cork City",
      pickupDetail: "City Center",
      destination: "Killarney",
      destinationDetail: "City Center",
      date: "5th Nov 2025",
      time: "2:00 PM",
      passengers: 1,
      duration: "1h 45m",
      price: "€85.50",
    },
    {
      id: "#12347",
      status: "cancelled",
      pickupLocation: "Limerick",
      pickupDetail: "City Center",
      destination: "Shannon Airport",
      destinationDetail: "Terminal 1",
      date: "1st Nov 2025",
      time: "9:30 AM",
      passengers: 3,
      duration: "45m",
      price: "€65.00",
      refundStatus: "Refund Processed",
    },
  ]);

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pickupLocation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter ? booking.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Handle booking actions
  const handleModify = useCallback(
    (id: string) => {
      const booking = bookings.find((b) => b.id === id);
      if (booking) {
        setSelectedBooking(booking);
        setShowModifyModal(true);
      }
    },
    [bookings]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      const booking = bookings.find((b) => b.id === id);
      if (booking) {
        setSelectedBooking(booking);
        setShowBookingDetails(true);
      }
    },
    [bookings]
  );

  const handleCancel = useCallback((id: string) => {
    setSelectedBookingId(id);
    setShowCancelDialog(true);
  }, []);

  const confirmCancel = useCallback(() => {
    if (selectedBookingId) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBookingId
            ? {
                ...booking,
                status: "cancelled",
                refundStatus: "Refund Processed",
              }
            : booking
        )
      );

      toast({
        title: "Booking Cancelled",
        description: `Booking ${selectedBookingId} has been cancelled.`,
      });

      setShowCancelDialog(false);
      setSelectedBookingId(null);
    }
  }, [selectedBookingId, toast]);

  const handleRateTrip = useCallback(
    (id: string) => {
      toast({
        title: "Rate Trip",
        description: `Rate your trip for booking ${id}`,
      });
      // router.push(`/bookings/rate/${id}`);
    },
    [toast]
  );

  const handleRebook = useCallback(
    (id: string) => {
      toast({
        title: "Rebook",
        description: `Rebooking trip from booking ${id}`,
      });
      // router.push(`/book?rebook=${id}`);
    },
    [toast]
  );

  const handleMoreActions = useCallback((id: string) => {
    // This is handled by the dropdown menu items directly
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10 w-full md:w-64"
                  placeholder="Search bookings..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center w-full md:w-auto"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {statusFilter
                      ? `${
                          statusFilter.charAt(0).toUpperCase() +
                          statusFilter.slice(1)
                        }`
                      : "Filter"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
                    Upcoming
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("cancelled")}
                  >
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  {...booking}
                  onModify={handleModify}
                  onViewDetails={handleViewDetails}
                  onCancel={handleCancel}
                  onRateTrip={handleRateTrip}
                  onRebook={handleRebook}
                  onMoreActions={handleMoreActions}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No bookings found</h3>
              <p className="text-gray-500 mt-1">
                {searchQuery || statusFilter
                  ? "Try adjusting your search or filter criteria."
                  : "You have no bookings yet."}
              </p>
              {!searchQuery && !statusFilter && (
                <Button className="mt-4" onClick={() => router.push("/")}>
                  Book a Ride
                </Button>
              )}
            </div>
          )}

          {/* Cancel Booking Confirmation Dialog */}
          <AlertDialog
            open={showCancelDialog}
            onOpenChange={setShowCancelDialog}
          >
            <AlertDialogOverlay className="bg-black/50" />
            <AlertDialogContent className="bg-white rounded-lg p-6 w-full max-w-md mx-4 sm:mx-0">
              <AlertDialogHeader className="mb-4">
                <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                  Are you sure you want to cancel this booking?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-gray-600">
                  This action cannot be undone. You may be eligible for a refund
                  as per our cancellation policy.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <AlertDialogCancel className="w-full sm:w-auto">
                  Go Back
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  onClick={confirmCancel}
                >
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Modify Booking Modal */}
          <AlertDialog open={showModifyModal} onOpenChange={setShowModifyModal}>
            <AlertDialogContent className="max-w-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">
                  Modify Booking
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  Update your booking details below
                </AlertDialogDescription>
              </AlertDialogHeader>

              {selectedBooking && (
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Pickup Location</h4>
                      <div className="flex items-center p-3 border rounded-lg">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <p className="font-medium">
                            {selectedBooking.pickupLocation}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedBooking.pickupDetail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Destination</h4>
                      <div className="flex items-center p-3 border rounded-lg">
                        <MapPin className="h-5 w-5 mr-2 text-green-600" />
                        <div>
                          <p className="font-medium">
                            {selectedBooking.destination}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedBooking.destinationDetail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Date & Time</h4>
                      <div className="flex items-center p-3 border rounded-lg">
                        <CalendarDays className="h-5 w-5 mr-2 text-purple-600" />
                        <div>
                          <p className="font-medium">
                            {selectedBooking.date} at {selectedBooking.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {selectedBooking.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Passengers</h4>
                      <div className="flex items-center p-3 border rounded-lg">
                        <Users className="h-5 w-5 mr-2 text-amber-600" />
                        <div>
                          <p className="font-medium">
                            {selectedBooking.passengers}{" "}
                            {selectedBooking.passengers === 1
                              ? "Passenger"
                              : "Passengers"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total: {selectedBooking.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="font-medium">Modify Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Change Date/Time
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MapPin className="h-4 w-4 mr-2" />
                        Change Pickup/Drop-off
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Change Passengers
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Navigation className="h-4 w-4 mr-2" />
                        Change Route
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={() => {
                    toast({
                      title: "Booking Updated",
                      description:
                        "Your booking has been successfully updated.",
                    });
                    setShowModifyModal(false);
                  }}
                >
                  Save Changes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Booking Details Modal */}
          {showBookingDetails && selectedBooking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Booking Details</h2>
                      <p className="text-gray-500 text-sm">
                        ID: {selectedBooking.id}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBookingDetails(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center space-x-2">
                      {selectedBooking.status === "upcoming" && (
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Upcoming
                        </div>
                      )}
                      {selectedBooking.status === "completed" && (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Completed
                        </div>
                      )}
                      {selectedBooking.status === "cancelled" && (
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancelled
                        </div>
                      )}
                    </div>

                    {/* Trip Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-3">Trip Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <MapPinIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Pickup Location</p>
                            <p className="text-gray-600">
                              {selectedBooking.pickupLocation}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedBooking.pickupDetail}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <MapPinIcon className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Destination</p>
                            <p className="text-gray-600">
                              {selectedBooking.destination}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedBooking.destinationDetail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                          <CalendarDays className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date & Time</p>
                          <p className="font-medium">
                            {selectedBooking.date}, {selectedBooking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Passengers</p>
                          <p className="font-medium">
                            {selectedBooking.passengers}{" "}
                            {selectedBooking.passengers > 1
                              ? "People"
                              : "Person"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                          <Clock9 className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">
                            {selectedBooking.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                          <CreditCard className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-medium">{selectedBooking.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                      {selectedBooking.status === "upcoming" && (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowBookingDetails(false);
                              handleModify(selectedBooking.id);
                            }}
                          >
                            Modify Booking
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowBookingDetails(false);
                              handleCancel(selectedBooking.id);
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Cancel Booking
                          </Button>
                        </>
                      )}
                      {selectedBooking.status === "completed" && (
                        <Button
                          onClick={() => {
                            setShowBookingDetails(false);
                            handleRateTrip(selectedBooking.id);
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Rate This Trip
                        </Button>
                      )}
                      {selectedBooking.status === "cancelled" && (
                        <Button
                          onClick={() => {
                            setShowBookingDetails(false);
                            handleRebook(selectedBooking.id);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Rebook This Trip
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => setShowBookingDetails(false)}
                        className="ml-auto"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
