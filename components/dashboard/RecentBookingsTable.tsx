import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Loading from "../common/loading";

interface RecentBookingsTableProps {
  isLoading: boolean;
  recentBookings: any[];
  isAgent: boolean;
}

const renderStatusBadge = (status: string) => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 ring-1 ring-emerald-600/20 border-none shadow-none font-semibold px-2.5 py-0.5">
          Confirmed
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 ring-1 ring-amber-600/20 border-none shadow-none font-semibold px-2.5 py-0.5">
          Pending
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge className="bg-red-50 text-red-700 hover:bg-red-50 ring-1 ring-red-600/20 border-none shadow-none font-semibold px-2.5 py-0.5">
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="shadow-none font-semibold text-slate-600 px-2.5 py-0.5 border-slate-200">
          {status}
        </Badge>
      );
  }
};

export function RecentBookingsTable({
  isLoading,
  recentBookings,
  isAgent,
}: RecentBookingsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-6">
      <div className="p-6 md:p-8 border-b border-slate-100/50 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Bookings</h2>
        <Link
          href="/dashboard/bookings"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All &rarr;
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : recentBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12 px-6 md:px-8">Client</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Route</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Service</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Date & Time</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12">Price</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] h-12 pr-6 md:pr-8">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking: any, index: number) => (
                <TableRow key={booking._id || booking.id || index} className="border-slate-100/50 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="font-bold text-slate-900 px-6 md:px-8 py-4 whitespace-nowrap">
                    {booking.clientName}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="text-xs space-y-1">
                      <p className="text-slate-900 font-semibold truncate max-w-[150px]">
                        {booking.from}
                      </p>
                      <p className="text-slate-500 font-medium truncate max-w-[150px]">
                        to {booking.to}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md">
                      {booking.serviceType?.toLowerCase().replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <div className="text-xs font-medium space-y-1">
                      <p className="text-slate-900">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-slate-500">
                        {booking.timeSlot?.start}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-slate-900 py-4 text-sm">
                    €{booking.totalPrice}
                  </TableCell>
                  <TableCell className="pr-6 md:pr-8 py-4 whitespace-nowrap">{renderStatusBadge(booking.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-16 px-6">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-slate-50/50">
            <Calendar className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No recent bookings</h3>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">Looks like there hasn't been any activity here yet. When you book a trip, it will show up here.</p>
          {!isAgent && (
            <Link
              href="/transfer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md shadow-blue-200"
            >
              Book Your First Trip
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
