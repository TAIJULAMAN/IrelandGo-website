import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  CalendarDays,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Loader2,
} from "lucide-react";

interface BookingsTableProps {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  isLoading: boolean;
  isError: boolean;
  filteredBookings: any[];
  handleViewBooking: (booking: any) => void;
}

export function BookingsTable({
  statusFilter,
  setStatusFilter,
  isLoading,
  isError,
  filteredBookings,
  handleViewBooking,
}: BookingsTableProps) {
  const renderStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 ring-1 ring-emerald-600/20 border-none shadow-none font-semibold px-2.5 py-0.5 uppercase tracking-wide text-[10px]">
            <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 ring-1 ring-amber-600/20 border-none shadow-none font-semibold px-2.5 py-0.5 uppercase tracking-wide text-[10px]">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <Badge className="bg-red-50 text-red-700 hover:bg-red-50 ring-1 ring-red-600/20 border-none shadow-none font-semibold px-2.5 py-0.5 uppercase tracking-wide text-[10px]">
            <XCircle className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="shadow-none font-semibold text-slate-600 px-2.5 py-0.5 border-slate-200 uppercase tracking-wide text-[10px]">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Bookings List</h2>
          <p className="text-sm text-slate-500 mt-1">
            View all your travel bookings
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 w-full sm:w-[180px] rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer hover:bg-slate-100/50"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="p-0">
        {isLoading ? (
          <div className="flex justify-center flex-col items-center py-16 gap-4 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium">Loading your bookings...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-16 text-red-500 font-medium">
            Failed to load bookings. Please try again.
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-slate-50/50">
              <CalendarDays className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No bookings found</h3>
            <p className="text-slate-500 max-w-sm mx-auto text-sm">We couldn't find any bookings matching your current filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12 px-6 md:px-8">Route</TableHead>
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Date & Time</TableHead>
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Client Name</TableHead>
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Type</TableHead>
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Status</TableHead>
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Payment</TableHead>
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12 text-right pr-6 md:pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking: any, index: number) => (
                  <TableRow
                    key={booking._id || booking.id || index}
                    className="border-slate-100/50 hover:bg-slate-50/50 transition-colors group"
                  >
                    <TableCell className="py-4 px-6 md:px-8">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="font-bold text-slate-900 text-sm truncate max-w-[200px]">
                            {booking.from}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-slate-600 text-sm truncate max-w-[200px]">
                            {booking.to}
                          </span>
                        </div>
                        {booking.isReturn && (
                          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest ml-6 bg-blue-50 px-2 py-0.5 rounded-md inline-block w-fit">
                            Return Trip
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 whitespace-nowrap">
                      <div className="flex items-start gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-400 mt-0.5" />
                        <div className="text-xs font-medium space-y-1">
                          <div className="text-slate-900 font-bold">
                            {new Date(
                              booking.date || booking.createdAt,
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-slate-500">
                            {booking.timeSlot?.start}{" "}
                            {booking.timeSlot?.end
                              ? `- ${booking.timeSlot.end}`
                              : ""}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-900">{booking.clientName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm whitespace-nowrap">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md">
                        {booking.serviceType?.replace(/_/g, " ")}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 whitespace-nowrap">
                      {renderStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell className="font-black text-slate-900 py-4 text-sm">
                      €{booking.totalPrice}
                    </TableCell>
                    <TableCell className="text-right py-4 pr-6 md:pr-8">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewBooking(booking)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl"
                      >
                        <Eye className="h-4 w-4 mr-1.5" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
