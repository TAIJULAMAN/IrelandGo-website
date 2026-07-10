import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CalendarDays,
  Users,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface ViewBookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any | null;
}

export function ViewBookingModal({
  isOpen,
  onOpenChange,
  booking,
}: ViewBookingModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-slate-50/50 p-6 md:p-8 border-b border-slate-100/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Booking Details</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              View complete information about this trip
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                booking.status === "CONFIRMED"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                  : booking.status === "PENDING"
                  ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                  : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
              }`}
            >
              {booking.status === "CONFIRMED" && (
                <CheckCircle className="h-4 w-4" />
              )}
              {booking.status === "PENDING" && <Clock className="h-4 w-4" />}
              {(booking.status === "CANCELLED" ||
                booking.status === "REJECTED") && (
                <XCircle className="h-4 w-4" />
              )}
              {booking.status}
            </span>
          </div>

          {/* Trip Details */}
          <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-slate-900 tracking-tight">Trip Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl ring-1 ring-blue-100 shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pickup Location</p>
                  <p className="font-bold text-slate-900 mt-0.5">{booking.from}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl ring-1 ring-emerald-100 shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {booking.to}{" "}
                    {booking.isReturn && (
                      <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest ml-2 bg-blue-50 px-2 py-0.5 rounded-md">
                        Return
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl ring-1 ring-purple-100 shadow-sm">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {new Date(
                      booking.date || booking.createdAt
                    ).toLocaleDateString()}
                    <span className="block text-slate-500 font-medium text-sm mt-0.5">
                      {booking.timeSlot?.start}{" "}
                      {booking.timeSlot?.end
                        ? ` - ${booking.timeSlot.end}`
                        : ""}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl ring-1 ring-amber-100 shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Client Info</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {booking.clientName}
                    <span className="block text-slate-500 font-medium text-sm mt-0.5">
                      {booking.user?.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center justify-between p-6 bg-slate-900 rounded-2xl shadow-lg">
            <span className="font-bold text-slate-300 tracking-tight">Total Price</span>
            <span className="text-3xl font-black text-white tracking-tight">
              €{booking.totalPrice}
            </span>
          </div>

          {booking.payments?.[0]?.agent_commission && (
            <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100">
              <span className="font-bold text-emerald-800 tracking-tight">
                Your Commission
              </span>
              <span className="text-2xl font-black text-emerald-600 tracking-tight">
                €{booking.payments[0].agent_commission}
              </span>
            </div>
          )}
        </div>

        <div className="bg-slate-50/50 p-6 border-t border-slate-100/50 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-bold text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 px-6 py-2.5 h-auto"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
